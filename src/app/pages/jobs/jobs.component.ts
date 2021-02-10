import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService, TimeSelectOptions } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {
  faSpinner = faSpinner;
  faSearch = faSearch;
  timeSelectOptions = TimeSelectOptions;

  timeframe = 86400*14;
  searchForm: FormGroup;

  subscriptions: Subscription[] = [];
  boosts = [];
  searching = false;
  searched = false;

  constructor(private api:APIService, private fb: FormBuilder, private route: ActivatedRoute, private router:Router) {
    // let timeframe = this.route.snapshot.queryParams['timeframe'] || 86400*14;
    // if(!this.timeSelectOptions.find(o => { return o.value == timeframe})){
    //   timeframe = 86400*14;
    // }
    // this.searchForm = this.fb.group({
    //   timeframe: [timeframe]
    // });
    // this.search();
  }

  ngOnInit(): void {
    // this.subscriptions = [
    //   this.api.boosts.subscribe(boosts => {
    //     this.searching = false;
    //     this.boosts = boosts;
    //   })
    // ];
  }

  async search() {
    // this.searching = true;
    // this.timeframe = this.searchForm.controls['timeframe'].value;
    // this.router.navigate(['jobs'], { queryParams: { timeframe: this.timeframe } });
    // await this.api.searchIncompleteBoost(this.timeframe);
    // this.searched = true;
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(s => s.unsubscribe());
    // this.subscriptions = [];
  }

}
