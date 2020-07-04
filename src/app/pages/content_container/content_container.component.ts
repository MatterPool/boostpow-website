import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/data_dimensions/alerts/actions/alerts';
import { ShowLoadingAction } from '@application/actions/application';
import * as fromOffers from '@offers/reducers';
import { GetStatus, SetSessionKey, GetBoostJob, GetBoostJobUtxos, GetBoostSearch } from '@offers/actions/offers.actions';
import uuidv1 from  'uuid/v1';

@Component({
  selector: 'app-content-container',
  templateUrl: './content_container.component.html',
  styleUrls: ['./content_container.component.sass']
})
export class ContentContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  uploadStatus$ = this.store.pipe(select(fromOffers.getUploadStatus));
  sessionKey$ = this.store.pipe(select(fromOffers.getSessionKey));
  boostJob$ = this.store.pipe(select(fromOffers.getBoostJob));
  boostJobUtxos$ = this.store.pipe(select(fromOffers.getBoostJobUtxos));
  boostSearchResults$ = this.store.pipe(select(fromOffers.getBoostSearchResults));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const contenthex = this.route.snapshot.paramMap.get("contenthex");
    this.store.dispatch(new GetBoostSearch({
      contenthex: contenthex
    }));
    /*this.boostJob$.subscribe((record) => {
      if (record && record.getScriptHash()) {
        this.store.dispatch(new GetBoostJobUtxos(record.getScriptHash()));
      }
    })*/
  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }
}