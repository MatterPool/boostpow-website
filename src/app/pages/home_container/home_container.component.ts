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
import uuidv1 from  'uuid/v1';

@Component({
  selector: 'app-home-container',
  templateUrl: './home_container.component.html',
  styleUrls: ['./home_container.component.sass']
})
export class HomeContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  uploadStatus$ = this.store.pipe(select(fromMain.getUploadStatus));
  sessionKey$ = this.store.pipe(select(fromMain.getSessionKey));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    const tag = this.route.snapshot.paramMap.get("tag");

    if (tag) {
      this.store.dispatch(new GetStatus(tag));
      this.store.dispatch(new SetSessionKey(tag));
    } else {
      this.store.dispatch(new SetSessionKey(uuidv1()));
    }

  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }

}
