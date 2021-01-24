import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { BoostSignalSummary } from '@matterpool/boostpow-js/dist/boost-signal-summary-model';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.sass']
})
export class SearchViewComponent {
  @Input() alerts: Alert[]
  @Input() sessionKey: string;
  @Input() boostSearchResults: BoostSignalSummary[];

  topic = '';
  timeframe = '';

  constructor(private router: Router, private store: Store<fromStore.State>, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(o => {
      let topic = o.get('topic');
      if (topic !== null) this.topic = topic;

      let timeframe = o.get('timeframe');
      this.timeframe = timeframe !== null ? timeframe : 'fortnight';
    });

  }

  get isErrorTopic(): boolean {
    return false;
  }

  updateProperty(name: any, evt: any): any {
    this[name] = evt.target.value;
    return false;
  }

  topicEnter (evt:any) {
    this.updateProperty('topic', evt);
    this.clickSearch();
  }

  clickSearch() {     
    this.router.navigate(['/search'], { queryParams: { topic: this.topic, timeframe: this.timeframe } }); 
  }
}
