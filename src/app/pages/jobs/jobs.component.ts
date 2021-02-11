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
  incompleteBoosts = [];
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
      this.api.incompleteBoosts.subscribe(boosts => {
        this.searching = false;
        this.incompleteBoosts = boosts;
        console.log("incompleteBoosts is ", boosts);
      })
    ];
  }

  async search() {
    this.searching = true;
    this.timeframe = this.searchForm.controls['timeframe'].value;
    this.router.navigate(['j'], { queryParams: { timeframe: this.timeframe } });
    await this.api.searchIncompleteBoost(this.timeframe);
    this.searched = true;
  }

  async addBoost() {
    await boostPublish.open({
      label: 'Boost Content',
      content: { diff: 1 },
      outputs: [],
      topic: {
        show: true
      },
      onPayment: async (e) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
        }, 4000);
      }
    });
    return false;
  }

  openContent(content:string){
    this.router.navigate(['/c/'+content]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
