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
      onPayment: async (e) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
          //this.router.navigate(['search']);
          this.router.navigate(['job', e.boostJobStatus.boostJobId]);
        }, 500);
      }
    });
    // this.router.navigate(['create']);
    return false;
  }
}
