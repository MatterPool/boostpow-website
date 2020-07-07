import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'BoostPow';

  constructor(private router: Router) {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    let previousVisitedPage = '';
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      // Track the time the user remains on a particular page
      // Some inaccuracy could happen because of nature of web applications
      if (previousVisitedPage) {
         // this.mixpanelService.trackEvent(mpEvents.USER_ON_PAGE, { page: previousVisitedPage });
      }
      // this.mixpanelService.trackTimeEvent(mpEvents.USER_ON_PAGE);
      previousVisitedPage = evt.urlAfterRedirects;

      // Register page view
      // this.mixpanelService.trackEvent(mpEvents.USER_ON_PAGE, { page: previousVisitedPage });
    });
  }
}

