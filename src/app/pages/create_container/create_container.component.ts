import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/data_dimensions/alerts/actions/alerts';
import { ShowLoadingAction } from '@application/actions/application';
import * as fromOffers from '@offers/reducers';
import { GetStatus, SetSessionKey } from '@offers/actions/offers.actions';
import uuidv1 from  'uuid/v1';

@Component({
  selector: 'app-create-container',
  templateUrl: './create_container.component.html',
  styleUrls: ['./create_container.component.sass']
})
export class CreateContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  uploadStatus$ = this.store.pipe(select(fromOffers.getUploadStatus));
  sessionKey$ = this.store.pipe(select(fromOffers.getSessionKey));
  defaultCreateJob = {
    content: '',
    tag: '',
    type: '',
    metadata: '',
    unique: '',
    diff: 1
  };
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

    this.route.queryParams .subscribe(params => {
      if (params.content) {
        this.defaultCreateJob.content = params.content;
      }
      if (params.type) {
        this.defaultCreateJob.type = params.type;
      }
      if (params.metadata) {
        this.defaultCreateJob.metadata = params.metadata;
      }
      if (params.tag) {
        this.defaultCreateJob.tag = params.tag;
      }
      if (params.unique) {
        this.defaultCreateJob.unique = params.unique;
      }
      if (params.diff) {
        this.defaultCreateJob.diff = params.diff;
      }
    })

  }



  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }

}
