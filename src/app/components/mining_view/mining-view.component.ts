import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { UploadStatus } from '@offers/models/upload-status.interface';
import { NgForm } from '@angular/forms';
import * as boost from 'boostpow-js';
import { BoostPowJobModel } from 'boostpow-js/dist/boost-pow-job-model';
import { BoostPowJobProofModel } from 'boostpow-js/dist/boost-pow-job-proof-model';
import { BoostPowSimpleMinerModel } from 'boostpow-js/dist/boost-pow-simple-miner-model';

declare var twetchPay;

@Component({
  selector: 'app-mining-view',
  templateUrl: './mining-view.component.html',
  styleUrls: ['./mining-view.component.sass']
})
export class MiningViewComponent {
  @Input() alerts: Alert[]
  @Input() uploadStatus: UploadStatus;
  @Input() sessionKey: string;
  @Input() boostJob: BoostPowJobModel;
  @Input() boostJobUtxos: any[];

  fileUploads = [];
  isDocsOpen = false;
  inputContent: string;
  inputReward;
  inputDiff: number;
  boostJobProof: BoostPowJobProofModel;

  show_category = true;
  show_tag = true;
  show_metadata = true;
  show_unique = true;
  addedFilesNow = [];
  hashesDone = 0;
  cancelNextTick = false;
  isStarted = false;

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  async startMiner() {
    console.log('starting...');
    this.isStarted = true;
    const powResult =
      BoostPowSimpleMinerModel.startMining(
        this.boostJob,
        this.boostJobProof,
        0,
        // Increment display
        (counter) => {
          this.hashesDone = counter;
        },
        // If to cancel
        () => {
          this.isStarted = false;
          return this.cancelNextTick;
        }
      );
      console.log('pow found boost', powResult);
      console.log('pow found boost json', JSON.stringify(powResult));
  }

  async stopMiner() {
    console.log('stopping..');
    this.cancelNextTick = true;
    console.log('stop triggered');
  }

  get boostReward(): string {
    return (this.jobValue / 100000000) + '';
  }

  get jobValue(): number {
    return this.boostJob && this.boostJob ? this.boostJob.getValue() : 0;
  }

  gotoAddMoreBoost() {
    this.router.navigate(['create'])
    return false;
  }

  get jobLink(): string {
    return `/job/${this.jobTxid}`
  }

  gotoJobLink() {
    this.router.navigate(['job', this.jobTxid]);
    return false;
  }

  get transactionUrl(): string {
    if (!this.boostJob) {
      return '';
    }
    return `https://search.matterpool.io/tx/` + this.boostJob.getTxid();
  }

  get stylesLogScaleDiff(): string {
    return (this.logScaleDiff40) * 2.5 + '%';
  }
  get logScaleDiff40(): number {
    if (!this.boostJob) {
      return 0;
    }
    const diff = Math.log(this.boostJob.getDiff());
    return diff < 1 ? 1 : Math.round(diff);
  }

  toggleField(field) {
    this['show_' + field] = !this['show_' + field];
    return false;
  }

  isFieldVisible(field) {
    return this['show_' + field];
  }

  get jobTxid(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getTxid() : '';
  }

  get boostJobContent(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getContentString() : '';
  }

  get boostJobContentHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getContentHex() : '';
  }

  get boostJobTag(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getTagString() : '';
  }
  get boostJobTagHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getTagHex() : '';
  }

  get boostJobMetadata(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getMetadataString() : '';
  }
  get boostJobMetadataHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getMetadataHex() : '';
  }

  get boostJobCategory(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getCategoryString() : '';
  }
  get boostJobCategoryHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getCategoryHex() : '';
  }

  get boostJobDiff(): number {
    return this.boostJob && this.boostJob ? this.boostJob.getDiff() : undefined;
  }
  get boostJobUnique(): number {
    return this.boostJob && this.boostJob ? this.boostJob.getUnique() : undefined;
  }
  get boostJobUniqueHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getUniqueHex() : '';
  }

  ngOnInit() {
    this.inputContent = 'Hello Boost';
    this.inputReward = 0.01;
    this.inputDiff = 1;
    this.boostJobProof = boost.BoostPowJobProof.fromObject({
        signature: '0000000000000000000000000000000000000000000000000000000000000001',
        minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
        time: '00000001',
        minerNonce: '0000000000000001',
        minerAddress: '0000000000000000000000000000000000000001',
    })
  }

  get payOutputs(): any[] {
    const outputs = [];

    const boostJob = boost.BoostPowJob.fromObject({
      content: this.inputContent,
      diff: this.inputDiff,
      category: '00',
      metadata: '00',
      unique: '00',
      tag: '00',
    });
    // https://search.matterpool.io/tx/debbd830e80bdccf25d8659b98e8f77517fe0af4c5c161d645bf86a4e7fcd301
    outputs.push({
      script: boostJob.toASM(),
      amount: this.inputReward,
      currency: "USD"
    })
    console.log('outputs', outputs);
    return outputs;
  }

  async payForBoost() {
    await twetchPay.pay({
      label: 'Purchase',
      outputs: this.payOutputs,
      onPayment: (e) => {
        console.log('payment', e);
        //this.router.navigate(['share', this.sessionKey]);
      }
    });
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  get validForm(): boolean {
    return this.inputContent && this.inputContent.length <= 32 && this.inputDiff >= 1 && this.inputReward >= 0.01;
  }

}
