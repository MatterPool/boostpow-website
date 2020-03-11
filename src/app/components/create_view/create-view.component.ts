import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { environment } from '@environments/environment';
import { UploadStatus } from '@offers/models/upload-status.interface';
import { NgForm } from '@angular/forms';
import * as boost from 'boostpow-js';

declare var twetchPay;

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.sass']
})
export class CreateViewComponent {
  @Input() alerts: Alert[]
  @Input() uploadStatus: UploadStatus;
  @Input() sessionKey: string;
  @Input() defaultCreateJob: any;
  fileUploads = [];
  isDocsOpen = false;
  inputContent: string;
  inputReward;
  inputDiff: number;
  inputCategory: string;
  inputTag: string;
  inputMetadata: string;
  inputUnique: string;
  showExtraOptions = false;

  useHex = false;

  @ViewChild("mb") public mbRef: ElementRef;
  @ViewChild("ro") public roRef: ElementRef;

  addedFilesNow = [];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  ngOnInit() {
    this.inputContent = this.defaultCreateJob ? this.defaultCreateJob.content : '';
    this.inputReward = 0.01;
    this.inputDiff = this.defaultCreateJob ? this.defaultCreateJob.diff : 1;
    this.inputUnique = this.defaultCreateJob ? this.defaultCreateJob.unique : '';
    this.inputTag = this.defaultCreateJob ? this.defaultCreateJob.tag : '';
    this.inputMetadata = this.defaultCreateJob ? this.defaultCreateJob.metadata : '';
    this.inputCategory = this.defaultCreateJob ? this.defaultCreateJob.type : '';
    this.useHex = this.defaultCreateJob ? this.defaultCreateJob.useHex : true;
  }

  get payOutputs(): any[] {
    console.log('generating payoutputs: ',
    '--', this.inputContent , '--a-', this.inputCategory, '--meta-',
    this.inputMetadata, '-d-', this.inputTag, '-a-', this.inputDiff,
    '-s-', this.inputUnique);

    const outputs = [];
    let boostJob;
    if (this.useHex) {
      console.log('use hex', true);
      boostJob = boost.BoostPowJob.fromObject({
        content: Buffer.from(this.inputContent, 'hex').toString('hex'),
        diff: Number(this.inputDiff),
        category: Buffer.from(this.inputCategory, 'hex').toString('hex'),
        metadata: Buffer.from(this.inputMetadata, 'hex').toString('hex'),
        unique: Buffer.from(this.inputUnique, 'hex').toString('hex'),
        tag: Buffer.from(this.inputTag, 'hex').toString('hex'),
      });
    } else {
      boostJob = boost.BoostPowJob.fromObject({
        content: Buffer.from(this.inputContent, 'utf8').toString('hex'),
        diff: Number(this.inputDiff),
        category: this.inputCategory === '0' ? Buffer.from(this.inputCategory, 'hex').toString('hex') : Buffer.from(this.inputCategory, 'utf8').toString('hex'),
        metadata: Buffer.from(this.inputMetadata, 'utf8').toString('hex'),
        unique: Buffer.from(this.inputUnique, 'utf8').toString('hex'),
        tag: Buffer.from(this.inputTag, 'utf8').toString('hex'),
      });
      // https://search.matterpool.io/tx/debbd830e80bdccf25d8659b98e8f77517fe0af4c5c161d645bf86a4e7fcd301
    }
    console.log('constructed BoostJob: ', boostJob.toObject(), ", useHex: ", this.useHex);

    outputs.push({
      script: boostJob.toASM(),
      amount: this.inputReward,
      currency: "USD"
    })
    console.log('Payment outputs', outputs);
    return outputs;
  }

  async payForBoost() {
    await twetchPay.pay({
      label: 'Boost Content',
      outputs: this.payOutputs,
      onPayment: async (e) => {
        console.log('payment', e);
        console.log('boost', boost);
        const result = await boost.Graph().submitBoostJob(e.rawtx);
        console.log('result boostjob', result);
        setTimeout(() => {
          this.router.navigate(['job', e.txid]);
        }, 3000);
      }
    });
  }

  onSubmit(f: NgForm) {

  }

  get baseFeeSatoshis(): number {
    return 600;
  }

  get validForm(): boolean {
    return this.inputContent && this.inputContent.length <= 64 && this.inputDiff >= 1 && this.inputReward >= 0.01;
  }

}
