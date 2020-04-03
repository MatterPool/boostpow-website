import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import Dropzone from 'dropzone';
import { environment } from '@environments/environment';
import { UploadStatus } from '@offers/models/upload-status.interface';
import { GetStatus } from '@offers/actions/offers.actions';
import * as moment from 'moment';

import { BoostSignalSummary } from 'boostpow-js/dist/boost-signal-summary-model';
declare var twetchPay;

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.sass']
})
export class SearchViewComponent {
  @Input() alerts: Alert[]
  @Input() uploadStatus: UploadStatus;
  @Input() sessionKey: string;
  @Input() boostSearchResults: BoostSignalSummary[];

  @ViewChild("dropzone") public dzRef: ElementRef;
  dropzone = null;
  fileUploads = [];
  isDocsOpen = false;
  @ViewChild("mb") public mbRef: ElementRef;
  @ViewChild("ro") public roRef: ElementRef;

  addedFilesNow = [];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  valueFormat(item: number): number {
    return item / 100000000;
  }

  gotoBoostJobLink(txid: string) {
    this.router.navigate(['job', txid])
    return false;
  }

  boostJobLinkEntity(s: any): string {
    console.log('s', s);
    return `/job/${s.entity.boostJobId}`
  }

  boostJobLink(txid: string): string {
    return `/job/${txid}`
  }

  toggleDocs() {
    this.isDocsOpen = !this.isDocsOpen;
    return false;
  }

  ngOnChanges() {
    // this.renderMoneyButton();
    // this.renderRelay();
  }

  isTxid(boostResult: any) {
    if (!boostResult || !boostResult.entity) {
      return false;
    }
    try {
     // console.log('boostResult.entity.additionalData', boostResult.entity.additionalData);
      const j = JSON.parse(boostResult.entity.additionalData.trim());
      console.log('j parsed', j);
      if (j && j['t'] === 'txid') {
        return true;
      }
    } catch (ex) {
    }
    return false;
  }
  tagLink(tag) {
    let t = tag.replace(/^\0*/g, '');
    return '/search?tag=' + t.trim(); // { queryParams: { tag: tag } });
  }
  contentLink(content) {
    let t = content.replace(/^\0*/g, '');
    return '/search?content=' + t.trim(); // { queryParams: { tag: tag } });
  }
  categoryLink(category) {
    let t = category.replace(/^\0*/g, '');
    return '/search?category=' + t.trim(); // { queryParams: { tag: tag } });
  }

  formatAgo(unixtime) {
    return moment(unixtime * 1000).format('YYYY-MM-DD hh:mm:ss')
  }

  get getFormUploadReturn(): string {
    return ` {
      "payment_address":"1HmFVGFCDzQfnqBhVGrRVoqfigHhxwzitQ",
      "payment_satoshis":25293,
      "status_url":"/share/99cdbcd0-4f1b-11ea-8295-bfcd4eb723b4",
      "location":"https://thepathtothe-temporary-cache-storage-of/the/file/path"
  }`;
  }
  get getStatusReturn(): string {
    return `{"success":true,"result":[{"id":22,"session_tag":"9ee4bc10-4f06-11ea-bfa9-39c8f9f9d1ef","payment_address":"12GZ1fcoZ3RsEwxJN7NnrmATWNW3C96f8P","payment_address_path_num":26,"payment_sats_needed":9873,"txid":"f1e13b98d6c5228eb2f5fbe4071d91acc0e40e51aeaa8d14c1ec1a43d5d540e3","fileurl":"https://bitcoinfilesmatter.s3.us-west-2.amazonaws.com/a1732f20-4f06-11ea-8fe3-5b0a3a81ed4d-gbbbb.png","tx":"0100000...","filesize":13121,"blockhash":null,"created_time":1581670049,"first_broadcast_time":1581670145,"last_broadcast_time":1581670145}]}`;

  }
  ngOnInit() {

  }

  get getRows() {
    if (!this.uploadStatus) {
      return [];
    }
    const filteredRows = [];

    for (const item of this.uploadStatus.items) {
      if (!item.txid) {
        continue;
      }
      filteredRows.push(item);
    }
    return filteredRows;
  }

  get payOutputs(): any[] {
    const outputs = [];
    for (const rec of this.addedFilesNow) {
      outputs.push(
        {
          address: rec.payment_address,
          amount: rec.payment_satoshis / 100000000,
          currency: "BSV"
        }
      );
    }
    return outputs;
  }

  async uploadFiles() {
    await twetchPay.pay({
      label: 'Purchase',
      outputs: this.payOutputs,
      onPayment: (e) => {
        console.log('payment', e);
        this.router.navigate(['share', this.sessionKey]);
      }
    });
  }

  get fileUploadReport(): string {
    return JSON.stringify(this.fileUploads);
  }
  get validUploads(): boolean {
    return !!this.fileUploads.length;
  }

  get homepageUrl(): string {
    return environment.website_base_url;
  }
}
