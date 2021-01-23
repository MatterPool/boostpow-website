import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Alert } from '@alerts/models/alert.interface';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';

//import { BoostSignalSummary } from '@matterpool/boostpow-js/dist/boost-signal-summary-model';
import { BoostSignalSummarySerialize } from '@main/models/boost-signal-summary-serialize.interface';

declare var twetchPay;

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.sass']
})
export class ContentViewComponent implements OnInit, OnChanges {
  @Input() alerts: Alert[]
  @Input() boostSearchResults: BoostSignalSummarySerialize[];

  timeframe = '';
  contenthex = '';
  overallRank = 1;
  topicRanks = {};

  constructor(private router: Router, private store: Store<fromStore.State>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contenthex = this.route.snapshot.paramMap.get("contenthex");
  }

  ngOnChanges () {

    // boostSearchResults is grouped by category+content
    // calculate overall rank and tag ranks for just contenthex

    let timeframe = this.route.snapshot.queryParamMap.get('timeframe');
    this.timeframe = timeframe !== null ? timeframe : 'fortnight';

    let overallRank = 1;
    let topicRanks = {};
    let topicTotals = {};
    let contentTotals = {};

    this.boostSearchResults.forEach(item => {
      if (item.entity.contenthex === this.contenthex) {
        for (var topic in item.tags) {
          topic = topic.replace(/^\0*/g, '');
          topicRanks[topic] = 1;
          topicTotals[topic] = {};
        }
      }

      if (!contentTotals[item.entity.contenthex]) contentTotals[item.entity.contenthex] = 0;
      contentTotals[item.entity.contenthex] += item.totalDifficulty;
    });

    for (var con in contentTotals) {
      if (contentTotals[this.contenthex] < contentTotals[con]) {
        overallRank++;
      }
    }

    this.boostSearchResults.forEach(item => {
      for (var topic in item.tags) {
        let topic_ = topic.replace(/^\0*/g, '');
        if (!topicTotals[topic_]) continue;
        if (!topicTotals[topic_][item.entity.contenthex]) topicTotals[topic_][item.entity.contenthex] = 0; 

        topicTotals[topic_][item.entity.contenthex] += item.tags[topic];
      }
    });

    for (var topic in topicTotals) {
      for (var con in topicTotals[topic]) {
        if (topicTotals[topic][this.contenthex] < topicTotals[topic][con]) {
          topicRanks[topic]++;
        }
      }
    }

    console.log('topic', topicTotals)

    this.overallRank = overallRank;
    this.topicRanks = topicRanks;
  }

  contentResults(): BoostSignalSummarySerialize[] {
    return this.boostSearchResults.filter(item => item.entity.contenthex === this.contenthex);
  }

  getTopics(): string[] {
    return Object.keys(this.topicRanks).sort((a,b) => this.topicRanks[b] - this.topicRanks[a]);
  }

  topicLink(topic :string): string {
    return '/search?topic='+ topic.replace(/\0/g, '');
  }
}
