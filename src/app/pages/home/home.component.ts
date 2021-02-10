import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  constructor(private router: Router) {

  }

  async createBoost() {
    await boostPublish.open({
      label: 'Boost Content',
      outputs: [],
      topic: {
        show: true
      },
      onPayment: async (e: any) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
          this.router.navigate(['job', e.txid]);
        }, 4000);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
