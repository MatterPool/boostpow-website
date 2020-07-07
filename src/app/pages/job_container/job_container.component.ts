import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/domain/alerts/actions/alerts';
import * as fromMain from '@main/reducers';
import { GetBoostJob, GetBoostJobUtxos } from '@main/actions/main.actions';

@Component({
  selector: 'app-job-container',
  templateUrl: './job_container.component.html',
  styleUrls: ['./job_container.component.sass']
})
export class JobContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  boostJob$ = this.store.pipe(select(fromMain.getBoostJob));
  boostJobUtxos$ = this.store.pipe(select(fromMain.getBoostJobUtxos));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const txid = this.route.snapshot.paramMap.get("txid");
    const splitted = txid.split('.');
    this.store.dispatch(new GetBoostJob(splitted[0]));

    this.boostJob$.subscribe((record: any) => {
      if (record && record.scripthash) {
        this.store.dispatch(new GetBoostJobUtxos(record.scripthash));
      }
    })
  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }
}
