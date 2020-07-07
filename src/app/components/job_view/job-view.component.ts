import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';

declare var boostPublish;

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.sass']
})
export class JobViewComponent {
  @Input() alerts: Alert[]
  @Input() boostJob: any;
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
      if (item.txid === this.boostJob.txid && item.vout === this.boostJob.vout) {
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

  get transactionUrl(): string {
    if (!this.boostJob) {
      return '';
    }
    return `https://search.matterpool.io/tx/` + this.boostJob.txid;
  }

  get stylesLogScaleDiff(): string {
    return (this.logScaleDiff40) * 2.5 + '%';
  }
  get logScaleDiff40(): number {
    if (!this.boostJob) {
      return 0;
    }
    const diff = Math.log(this.boostJob.diff);
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
    console.log('this.boostJob && this.boostJob ? this.boostJob.value : 0', this.boostJob);
    return this.boostJob && this.boostJob ? this.boostJob.value : 0;
  }

  get jobTxid(): string {
    return this.boostJob && this.boostJob ? this.boostJob.txid : '';
  }

  get boostJobContent(): string {
    return this.boostJob && this.boostJob ? Buffer.from(this.boostJob.content, 'hex').toString('utf8') : '';
  }

  get boostJobContentHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.content : '';
  }

  get boostJobTag(): string {
    return this.boostJob && this.boostJob ? Buffer.from(this.boostJob.tag, 'hex').toString('utf8') : '';
  }
  get boostJobTagHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.tag : '';
  }

  get boostJobAdditionalData(): string {
    return this.boostJob && this.boostJob ? Buffer.from(this.boostJob.additionalData, 'hex').toString('utf8') : '';
  }
  get boostJobAdditionalDataHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.additionalData : '';
  }

  get boostJobCategory(): string {
    return this.boostJob && this.boostJob ? Buffer.from(this.boostJob.category, 'hex').toString('utf8') : '';
  }
  get boostJobCategoryHex(): string {
    return this.boostJob && this.boostJob ?  this.boostJob.category : '';
  }

  get boostJobDiff(): number {
    return this.boostJob && this.boostJob ? this.boostJob.diff : undefined;
  }
  get boostJobUserNonce(): number {
    return this.boostJob && this.boostJob ? this.boostJob.userNonce : undefined;
  }
  get boostJobUserNonceHex(): string {
    return this.boostJob && this.boostJob ? this.boostJob.userNonce : '';
  }

  ngOnInit() {
    this.inputContent = 'Hello Boost';
    this.inputReward = 0.01;
    this.inputDiff = 1;
  }

  payForBoost() {
    console.log('open');
    boostPublish.open({
      label: 'Boost Content',
      content: this.boostJobContentHex,
      outputs: [],
      onPayment: async (e) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
          //this.router.navigate(['search']);
          this.router.navigate(['job', e.boostJobStatus.boostJobId]);
        }, 4000);
      }
    });
    return false;
  }
}
