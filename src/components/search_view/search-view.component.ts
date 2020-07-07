import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { UploadStatus } from '@main/models/upload-status.interface';
import { BoostSignalSummary } from 'boostpow-js/dist/boost-signal-summary-model';

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

  constructor(private router: Router, private store: Store<fromStore.State>) {
  }
}
