import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';

import { BoostSignalSummary } from '@matterpool/boostpow-js/dist/boost-signal-summary-model';
import { BoostSignalSummarySerialize } from '@main/models/boost-signal-summary-serialize.interface';

declare var twetchPay;

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.sass']
})
export class ContentViewComponent {
  @Input() alerts: Alert[]
  @Input() boostSearchResults: BoostSignalSummarySerialize[];

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }

  getTags(): string[] {

    if (!this.boostSearchResults) {
      return [];
    }
    const tags = [];
    for (const item of this.boostSearchResults){
      for (const tag in item.tags) {
        tags.push(tag);
      }
    }
    return tags;
  }

  tagLink(tag): string {
    return '/search?tag='+ tag;
  }
}
