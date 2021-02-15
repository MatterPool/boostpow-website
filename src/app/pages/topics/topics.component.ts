import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService, TimeSelectOptions } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  faSpinner = faSpinner;
  faSearch = faSearch;
  timeSelectOptions = TimeSelectOptions;

  timeframe = 86400*14;
  searchForm: FormGroup;

  subscriptions: Subscription[] = [];
  topics = [];
  searching = false;
  searched = false;

  constructor(private api:APIService, private fb: FormBuilder, private route: ActivatedRoute, private router:Router) {
    let timeframe = this.route.snapshot.queryParams['timeframe'] || 86400*14;
    if(!this.timeSelectOptions.find(o => { return o.value == timeframe})){
      timeframe = 86400*14;
    }
    this.searchForm = this.fb.group({
      timeframe: [timeframe]
    });
    this.search();
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.api.topics.subscribe(topics => {
        this.searching = false;
        this.topics = topics;
      })
    ];
  }

  async search() {
    this.searching = true;
    this.timeframe = this.searchForm.controls['timeframe'].value;
    this.router.navigate(['topics'], { queryParams: { timeframe: this.timeframe } });
    await this.api.getTopicsData(this.timeframe);
    console.log("topics = ", this.topics);
    this.searched = true;
  }

  openTopic(topic:string){
    this.router.navigate(['search?topic='+topic+'&timeframe='+this.timeframe]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
