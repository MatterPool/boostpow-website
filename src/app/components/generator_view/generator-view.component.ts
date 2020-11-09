import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { environment } from '@environments/environment';
declare var twetchPay;
import * as boost from '@matterpool/boostpow-js';
import { RedirectAction } from '@main/actions/main.actions';

declare var boostPublish;

@Component({
  selector: 'app-generator-view',
  templateUrl: './generator-view.component.html',
  styleUrls: ['./generator-view.component.sass']
})
export class GeneratorViewComponent {
  @Input() alerts: Alert[]
  @Input() sessionKey: string;

  fileUploads = [];
  isDocsOpen = false;
  @ViewChild("mb") public mbRef: ElementRef;
  @ViewChild("ro") public roRef: ElementRef;

  addedFilesNow = [];
  boostvalue = 10000;
  content = '';
  dirtyFlags = {
    content: false,
    boostvalue: false
  };

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  async publishBoost() {
    let alreadyProcessed = false;
    await twetchPay.pay({
      label: 'Boost',
      outputs: [
        {
          address: '1HrPapZusrjYvafbbDWUw8iG8PJKXZLYTH',
          amount: this.boostvalue / 100000000,
          currency: 'BSV'
        }
      ],
      onPayment: async (e) => {
        // Some reason twetch pay is being called multiple times
        if (alreadyProcessed) {
          return;
        }
        alreadyProcessed = true;
        console.log('onPayment', e);
        const submitted = await boost.Graph({
         // graph_api_url: 'http://localhost:3000'
        }).submitBatchBoostJobRequest(e.rawtx, {
          content: this.content
        });
        console.log('submitted', submitted);
        this.store.dispatch(new RedirectAction('https://boostpow.com/jobs/' + submitted.jobId));
        /*setTimeout(() => {
          console.log('timeout fired', e);
          boost.Graph({
            // graph_api_url: 'http://localhost:3000'
          }).submitBatchBoostJobRequest(e.rawtx, {
            content: this.content
          });
          this.router.navigate(['jobs', submitted.jobId]);
        }, 5000);*/
      }
    });
    return false;
  }

  get isErrorContent(): boolean {
    const contentNormalized: any = Buffer.from(this.normalizedContent, 'hex');
    if (this.dirtyFlags.content && !this.normalizedContent || !contentNormalized || contentNormalized.length > 32) {
      return true;
    }
    return false;
  }

  get isError(): boolean {
    return this.isErrorBoostValue || this.isErrorContent;
  }

  get isErrorBoostValue(): boolean {
    if (this.dirtyFlags.boostvalue && (this.boostvalue > 100000000 || this.boostvalue < 800)) {
      return true;
    }
    return false;
  }

  get normalizedContent(): string {
    const contentNormalized: any = this.content;
    const TXID_REGEX = new RegExp('^[0-9a-fA-F]{64}$');
    if (!TXID_REGEX.test(this.content)) {
        return Buffer.from(contentNormalized, 'utf8').toString('hex');
    }
    return contentNormalized;
  }

  updateProperty(name: any, evt: any): any {
    this[name] = evt.target.value;
    this.dirtyFlags[name] = true;
    return false;
  }

  get homepageUrl(): string {
    return environment.website_base_url;
  }
}
