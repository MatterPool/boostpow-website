import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  async createBoost() {
    await boostPublish.open({
      label: 'Boost Content',
      outputs: [],
      showTagField: true,
      onPayment: async (e: any) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
          this.router.navigate(['job', e.txid]);
        }, 4000);
      }
    });
  }

}
