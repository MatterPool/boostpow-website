import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { UploadStatus } from '@offers/models/upload-status.interface';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.sass']
})
export class StatusViewComponent {
  @Input() alerts: Alert[];
  @Input() uploadStatus: UploadStatus;
  @Input() sessionKey: string;

  constructor(private router: Router, private store: Store<fromStore.State>) {}

  formatDate(d): string {
    return new Date(d * 1000).toLocaleTimeString();
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

  addMoreFiles() {
    this.router.navigate(['add', this.sessionKey]);
  }

  getTxLink(item): string {
    if (!item.txid) {
      return item.fileurl;
    }
    return environment.filepreview_base_url + '/' + item.txid;
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
    if (base.lastIndexOf('.') != -1) base = base.substring(0, base.lastIndexOf('.'));
    return base;
  }

  get sharelink(): string {
    return environment.website_base_url + '/share/' + this.sessionKey;
  }
}
