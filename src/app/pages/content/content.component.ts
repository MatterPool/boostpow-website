import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService, TimeSelectOptions } from 'src/app/_services/api.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  timeSelectOptions = TimeSelectOptions;
  searchForm: FormGroup;
  subscriptions: Subscription[] = [];
  searching = false;

  ranks: any;

  id:string;

  constructor(private api: APIService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    let timeframe = this.route.snapshot.queryParams['timeframe'] || 86400*14;
    if(!this.timeSelectOptions.find(o => { return o.value == timeframe})){
      timeframe = 86400*14;
    }
    this.searchForm = this.fb.group({
      timeframe: [timeframe]
    });
    this.getContent(this.id, timeframe);
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.api.ranks.subscribe(ranks => {
        this.searching = false;
        this.ranks = ranks;
        console.log("ranks = ", this.ranks);
      })
    ];
  }

  async getContent(id: string, timeframe: number) {
    try {
      await this.api.getRanksData(id, timeframe);
    } catch(e) {
      console.error(e);
    }
  }
}
