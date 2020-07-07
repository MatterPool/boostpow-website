import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="show" class="loading-container">
      <div class="loading-inner">
        <div class="loading-icon spinner spinner-small"></div>
        <span class="loading-text">Processing...</span>
      </div>
    </div>
  `,
  styles: [
    // tslint:disable-next-line:max-line-length
    '.loading-container { position: fixed; top: 0; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; align-items: center; background-color: rgba(255, 255, 255, 0.74); z-index: 999999; }',
    '.loading-inner { width: auto; }',
    '.loading-icon { display: inline-block; vertical-align: middle; }',
    '.loading-text { vertical-align: middle; }',
    '.spinner.spinner-small { width: 1.2rem; height: 1.2rem; }',
    '.spinner.spinner-small::before { width: 1.2rem; height: 1.2rem; border-width: 3px; }',
    '.spinner.spinner-small::after { width: 1.2rem; height: 1.2rem; }'
  ]
})
export class LoadingStateComponent {
  @Input() show: boolean;
}
