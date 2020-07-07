import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { UploadStatus } from '@main/models/upload-status.interface';
@Component({
  selector: 'app-preview-view',
  templateUrl: './preview-view.component.html',
  styleUrls: ['./preview-view.component.sass']
})
export class PreviewViewComponent {
  @Input() alerts: Alert[]
  @Input() uploadStatus: UploadStatus;

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  formatDate(d): string{
    return (new Date(d * 1000)).toLocaleTimeString();
  }
  get getRows() {

    if (!this.uploadStatus) {
      return [];
    }
    return this.uploadStatus.items;
  }

  getTxLink(txid): string {
    return 'https://media.bitcoinfiles.org/' + txid;
  }

  getExploreLink(txid): string {
    return 'https:/search.matterpool.io/tx/' + txid;
  }

  getAddressLink(address): string {
    return 'https://search.matterpool.io/address/' + address;
  }

  hasUploadStatus(): boolean {
    return this.uploadStatus && !!this.uploadStatus.items.length;
  }

  getBaseName(str): string {
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if(base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
   return base;
  }
}
