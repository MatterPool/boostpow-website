import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from '@alerts/models/alert.interface';
import domParser from '@app/helpers/dom-parser';

@Component({
  selector: 'app-alerts-messages',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertMessagesComponent {
  @Input() alerts: Array<Alert>;
  @Input() selectKey: string;

  @Output() deleteAlert = new EventEmitter<number>();

  getAlerClass(alertType) {
    return {
      'alert-info': alertType === 'info',
      'alert-danger': alertType === 'danger',
      'alert-success': alertType === 'success'
    };
  }

  formatAlertMessage(message: string): string {
    return domParser(message);
  }

  filterAlerts(): Array<Alert> {
    if (this.selectKey) {
      const reducedAlertArray = this.alerts.filter(ele => ele.selectiveDisplay && ele.selectKey === this.selectKey);
      return reducedAlertArray;
    } else {
      const reducedAlertArray = this.alerts.filter(ele => !ele.selectiveDisplay);
      return reducedAlertArray;
    }
  }
}
