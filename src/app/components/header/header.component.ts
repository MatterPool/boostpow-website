import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

declare var boostPublish;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private router: Router) {
  }
  get homepageUrl(): string {
    return environment.website_base_url;
  }

  async gotoCreate() {
    await boostPublish.open({
      label: 'Boost Content',
      outputs: [],
      onPayment: async (e, boostJobStatus) => {
        console.log('payment', e);
        console.log('result boostjob', boostJobStatus);
        setTimeout(() => {
          console.log('timeout fired');
          // window.location="https://boostpow.com/job/" + payment.txid;
          this.router.navigate(['job', e.txid]);
        }, 5000);
      }
    });
    // this.router.navigate(['create']);
    return false;
  }
}
