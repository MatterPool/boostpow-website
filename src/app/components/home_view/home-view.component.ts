import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { environment } from '@environments/environment';
declare var twetchPay;

declare var boostPublish;

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.sass']
})
export class HomeViewComponent {
  @Input() alerts: Alert[]
  @Input() sessionKey: string;

  fileUploads = [];
  isDocsOpen = false;
  @ViewChild("mb") public mbRef: ElementRef;
  @ViewChild("ro") public roRef: ElementRef;

  addedFilesNow = [];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  async publishBoost() {
    await boostPublish.open({
      label: 'Boost Content',
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

  get homepageUrl(): string {
    return environment.website_base_url;
  }
}
