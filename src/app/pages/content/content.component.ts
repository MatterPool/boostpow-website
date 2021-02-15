import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, TimeSelectOptions } from 'src/app/_services/api.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLess } from '@fortawesome/free-brands-svg-icons';

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
  searched = false;

  ranks: any;

  id: string;
  timeframe:number;

  constructor(private api:APIService, private fb: FormBuilder, private route: ActivatedRoute, private router:Router) {
    this.id = this.route.snapshot.params['id'];
    this.timeframe = this.route.snapshot.queryParams['timeframe'] || 86400*14;
    if(!this.timeSelectOptions.find(o => { return o.value == this.timeframe})){
      this.timeframe = 86400*14;
    }
    this.searchForm = this.fb.group({
      timeframe: [this.timeframe]
    });
    this.getRanks();
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

  async getRanks() {
    this.searching = true;
    this.timeframe = this.searchForm.controls['timeframe'].value;
    this.router.navigate(['c/' + this.id], { queryParams: { timeframe: this.timeframe } });
    try {
      await this.api.getRanksData(this.id, this.timeframe);
    } catch(e) {
      console.error(e);
    }
    this.searched = true;
  }
}
