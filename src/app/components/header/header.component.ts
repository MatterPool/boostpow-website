import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

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

  gotoCreate() {
    this.router.navigate(['create']);
    return false;
  }
}
