import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/domain/alerts/actions/alerts';
import { ShowLoadingAction } from '@application/actions/application';
import * as fromMain from '@main/reducers';
import { GetStatus, SetSessionKey } from '@main/actions/main.actions';

@Component({
  selector: 'app-status-container',
  templateUrl: './status_container.component.html',
  styleUrls: ['./status_container.component.sass']
})
export class StatusContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  uploadStatus$ = this.store.pipe(select(fromMain.getUploadStatus));
  sessionKey$ = this.store.pipe(select(fromMain.getSessionKey));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const tag = this.route.snapshot.paramMap.get("tag");
    this.store.dispatch(new GetStatus(tag));
    this.store.dispatch(new SetSessionKey(tag));

    // Trigger immediate refresh
    setTimeout(() => {
      this.store.dispatch(new GetStatus(tag));
    }, 2000);

    // Trigger immediate refresh
    setTimeout(() => {
      this.store.dispatch(new GetStatus(tag));
    }, 5000);

  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }

}
