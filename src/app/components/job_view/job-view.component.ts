import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { UploadStatus } from '@offers/models/upload-status.interface';
import { NgForm } from '@angular/forms';
import * as boost from 'boostpow-js';
import { BoostPowJobModel } from 'boostpow-js/dist/boost-pow-job-model';

declare var twetchPay;

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.sass']
})
export class JobViewComponent {
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

  show_category = true;
  show_tag = true;
  show_additionaldata = true;
  show_usernonce = true;

  addedFilesNow = [];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  get sumUnminedOutputs(): number {
    if (!this.boostJob) {
      return 0;
    }
    let sum = 0;
    for (const item of this.boostJobUtxos) {
        sum += item.satoshis;
    }
    return sum / 100000000;
  }

  get isMined(): boolean {
    if (!this.boostJob) {
      return true;
    }
    for (const item of this.boostJobUtxos) {
      if (item.txid === this.boostJob.getTxid() && item.vout === this.boostJob.getVout()) {
        return false;
      }
    }
    return true;
  }

  get getBoostJob(): any {
    if (!this.boostJob) {
      return {

      };
    }
    return this.boostJob;
  }

  gotoBoostJobLink(txid: string) {
    this.router.navigate(['job', txid, 'mining'])
    return false;
  }

  boostJobLink(txid: string): string {
    return `/job/${txid}/mining`
  }

  gotoAddMoreBoost() {
    this.router.navigate(['create'], {
      queryParams: {
        content: this.boostJobContent,
        diff: this.boostJobDiff,
        tag: this.boostJobTag,
        type: this.boostJobCategory,
        additionalData: this.boostJobAdditionalData,
        useHex: false
      },
      queryParamsHandling: 'merge'
    });
    return false;
  }

  get addMoreBoostUrl(): string{
    return `/create?content=${this.boostJobContent}&diff=${this.boostJobDiff}&type=${this.boostJobCategory}&additionalData=${this.boostJobAdditionalData}&tag=${this.boostJobTag}`
  }

  get miningLink(): string {
    return `/job/${this.jobTxid}/mining`
  }

  gotoMiningLink() {
    this.router.navigate(['job', this.jobTxid, 'mining']);
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

  get boostReward(): string {
    return (this.jobValue / 100000000) + '';
  }

  get jobValue(): number {
    return this.boostJob && this.boostJob ? this.boostJob.getValue() : 0;
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

  get boostJobAdditionalData(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getAdditionalDataString() : '';
  }
  get boostJobAdditionalDataHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getAdditionalDataHex() : '';
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
  get boostJobUserNonce(): number {
    return this.boostJob && this.boostJob ? this.boostJob.getUserNonce() : undefined;
  }
  get boostJobUserNonceHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.getUserNonceHex() : '';
  }

  ngOnInit() {
    this.inputContent = 'Hello Boost';
    this.inputReward = 0.01;
    this.inputDiff = 1;
  }

  get payOutputs(): any[] {
    const outputs = [];

    const boostJob = boost.BoostPowJob.fromObject({
      content: this.inputContent,
      diff: this.inputDiff,
      category: '00',
      additionalData: '00',
      userNonce: '00',
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
