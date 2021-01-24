import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '@application/reducers';
import * as fromAlerts from '@alerts/reducers';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { DeleteAlert } from '@app/domain/alerts/actions/alerts';
import { ShowLoadingAction } from '@application/actions/application';
import * as fromMain from '@main/reducers';
import { GetBoostSearch } from '@main/actions/main.actions';


import { timeframeToTimestamp } from '@app/helpers/boost-helpers';

@Component({
  selector: 'app-search-container',
  templateUrl: './search_container.component.html',
  styleUrls: ['./search_container.component.sass']
})
export class SearchContainerComponent implements OnInit, OnDestroy {
  showLoading$ = this.store.pipe(select(fromApplication.showLoading));
  alerts$ = this.store.pipe(select(fromAlerts.getAlerts));
  boostSearchResults$ = this.store.pipe(select(fromMain.getBoostSearchResults));

  constructor(private store: Store<any>, public modalCom: ModalCommunicationService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.queryParams
    .subscribe(recordsClone => {
      const records = Object.assign({}, recordsClone);
      if (records.content) {
        records.contentutf8 = records.content;
      }
      if (records.tag) {
        records.tagutf8 = records.tag;
      }
      if (records.topic) {
        records.tagutf8 = records.topic;
      }
      if (records.category) {
        records.categoryutf8 = records.category;
      } else {
        records.categoryutf8 = 'B';
      }
      if (records.additionalData || records.additionaldata) {
        records.additionaldatautf8 = records.additionalData || records.additionaldata;
      }
      if (records.tag) {
        records.tagutf8 = records.tag;
      }
      //if (records.minedTimeFrom) {
      //  records.minedTimeFrom = records.minedTimeFrom;
      //} else {
      //  records.minedTimeFrom = Math.round((new Date()).getTime() / 1000) - 3600 * 24 * 14;
      //}
      //if (records.minedTimeEnd) {
      //  records.minedTimeEnd = records.minedTimeEnd;
      //}

      if (!records.timeframe) {
        records.timeframe = 'fortnight';
      }

      let minedTimeFrom = timeframeToTimestamp(records.timeframe);

      if (minedTimeFrom !== undefined) {
        records.minedTimeFrom = minedTimeFrom;
      }

      this.store.dispatch(new GetBoostSearch(Object.assign({}, records)))
    });

  }

  ngOnDestroy() {
  }

  deleteAlert(id) {
    this.store.dispatch(new DeleteAlert(id));
  }

}
