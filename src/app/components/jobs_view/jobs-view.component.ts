import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import * as boost from '@matterpool/boostpow-js';
import { BoostSignalModel } from '@matterpool/boostpow-js/dist/boost-signal-model';
import * as moment from 'moment';
declare var boostPublish;

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.sass']
})
export class JobsViewComponent implements OnInit {
  @Input() alerts: Alert[]
  @Input() boostJob: any;
  @Input() boostJobs: any;
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
  showDetails = {};
  addedFilesNow = [];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }


  twitterLink(sig: BoostSignalModel): string {
    return 'https://twitter.com/intent/tweet?text=' + 'I added ' + sig.difficulty()  + ' units of Boost difficulty to my content \"' + sig.content() + '\"' + 'https://boostpow.com/jobs/' + this.boostJobs.jobId + ' #boostpow #helloboost';
  }
  getJobLink(): string {
    return 'https://search.matterpool.io/tx/' + this.boostJobs.jobId;
  }

  get eachBoostSignals(): any[] {
    if (!this.boostJobs) {
      return [];
    }
    const formatted = [];
    for (const job of this.boostJobs.boostJobs) {
      if (!job.boostPowString) {
        continue;
      }
      formatted.push(
        boost.BoostSignal.fromHex(job.boostPowString, job.boostPowMetadata, job.txid, job.vout)
      );
    }
    return formatted;
  }

  get isCompleted(): boolean {
    return this.boostJobs && this.boostJobs.status === 'COMPLETE';
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

  getShowDetails(sig: BoostSignalModel): boolean {
   return this.showDetails[sig.hash()];
  }

  updateShowDetails(sig: BoostSignalModel, show: boolean) {
    this.showDetails[sig.hash()] = show;
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

  get boostJobHash(): string {
    return this.boostJob && this.boostJob ? this.boostJob.boostJobHash : '';
  }

  get masterBoostJobId(): string {
    return this.boostJobs ? this.boostJobs.jobId : '';
  }

  boostJobAdditionalData(sig: BoostSignalModel): string {
    return sig ? sig.additionalData() : '';
  }
  boostJobAdditionalDataHex(sig: BoostSignalModel): string {
    return sig ? sig.additionalData(true) : '';
  }

  boostJobTag(sig: BoostSignalModel): string {
    return sig ? sig.tag() : '';
  }

  boostJobTagHex(sig: BoostSignalModel): string {
    return sig ? sig.tag(true) : '';
  }

  boostJobContent(sig: BoostSignalModel): string {
    return sig ? sig.content() : '';
  }

  boostJobTime(sig: BoostSignalModel): string {
    return moment(sig.time() * 1000).format('MMM DD, YYYY HH:mm');
  }

  boostHash(sig: BoostSignalModel): string {
    return sig ? sig.hash() : '';
  }

  boostJobContentHex(sig: BoostSignalModel): string {
    return sig ? sig.content(true) : '';
  }

  boostJobPowString(sig: BoostSignalModel): any {
    return sig ? sig.getBoostPowString() : '';
  }

  boostJobPowMetadata(sig: BoostSignalModel): any {
    return sig ? sig.getBoostMetadata() : '';
  }

  boostJobCategory(sig: BoostSignalModel): any {
    return sig ? sig.category() : '';
  }
  boostJobCategoryHex(sig: BoostSignalModel): any {
    return sig ? sig.category(true) : '';
  }

  boostJobDiff(sig: BoostSignalModel): number {
    return sig ? sig.difficulty() : undefined;
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

    if (this.boostJobs && this.boostJobs.status !== 'COMPLETE') {
      setTimeout(() => {
        window.location.href = 'https://boostpow.com/jobs/' + this.boostJobs.jobId;
      }, 20000);
    }
  }


}
