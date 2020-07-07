import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/domain/alerts/actions/alerts';
import { ShowLoadingAction } from '@application/actions/application';
import * as fromMain from '@main/reducers';
import { GetStatus, SetSessionKey, GetBoostJob, GetBoostJobUtxos } from '@main/actions/main.actions';

@Component({
  selector: 'app-mining-container',
  templateUrl: './mining_container.component.html',
  styleUrls: ['./mining_container.component.sass']
})
export class MiningContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  uploadStatus$ = this.store.pipe(select(fromMain.getUploadStatus));
  sessionKey$ = this.store.pipe(select(fromMain.getSessionKey));
  boostJob$ = this.store.pipe(select(fromMain.getBoostJob));
  boostJobUtxos$ = this.store.pipe(select(fromMain.getBoostJobUtxos));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

ngOnInit() {
    const txid = this.route.snapshot.paramMap.get("txid");
    this.store.dispatch(new GetBoostJob(txid));

    this.boostJob$.subscribe((record) => {
      if (record && record.getScriptHash()) {
        this.store.dispatch(new GetBoostJobUtxos(record.getScriptHash()));
      }
    })
  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }
}
