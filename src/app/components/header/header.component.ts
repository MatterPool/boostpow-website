import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import * as fromStore from '../../reducers';
import { Store } from '@ngrx/store';
import { RedirectAction } from '@main/actions/main.actions';
declare var boostPublish;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private router: Router,  private store: Store<fromStore.State>) {
  }
  get homepageUrl(): string {
    return environment.website_base_url;
  }

  async gotoCreate() {
    await boostPublish.open({
      label: 'Boost Content',
      outputs: [],
      showTagField: true,
      onPayment: async (e) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
          //this.router.navigate(['search']);
          this.store.dispatch(new RedirectAction('https://boostpow.com/jobs/' + e.txid));
          //this.router.navigate(['job', e.boostJobStatus.boostJobId]);
        }, 4000);
      }
    });
    // this.router.navigate(['create']);
    return false;
  }
}
