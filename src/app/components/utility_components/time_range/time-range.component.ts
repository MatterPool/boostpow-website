import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.sass']
})
export class TimeRangeComponent {
  @Input() startTimeHour: string;
  @Input() startTimeAmPm: string;
  @Input() endTimeHour: string;
  @Input() endTimeAmPm: string;
  @Output() startTimeChanged = new EventEmitter<string>();
  @Output() endTimeChanged = new EventEmitter<string>();

  get startTimes(): Array<string> {
    return ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];
  }

  get endTimes(): Array<string> {
    return ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];
  }

  get initialStartTimeHour(): string {
    return this.startTimeHour && this.startTimeHour.trim() !== '' ? this.startTimeHour : `8:00`;
  }

  get initialStartTimeAmPm(): string {
    return this.startTimeAmPm && this.startTimeAmPm.trim() !== '' ? this.startTimeAmPm : `AM`;
  }

  get initialEndTimeHour(): string {
    return this.endTimeHour && this.endTimeHour.trim() !== '' ? this.endTimeHour : `5:00`;
  }

  get initialEndTimeAmPm(): string {
    return this.endTimeAmPm && this.endTimeAmPm.trim() !== '' ? this.endTimeAmPm : `PM`;
  }

  startTimeHourSelected(event) {
    this.startTimeChanged.emit(`${event} ${this.startTimeAmPm}`);
  }

  startTimeAmPmSelected(event) {
    this.startTimeChanged.emit(`${this.startTimeHour} ${event}`);
  }

  endTimeHourSelected(event) {
    this.endTimeChanged.emit(`${event} ${this.endTimeAmPm}`);
  }

  endTimeAmPmSelected(event) {
    this.endTimeChanged.emit(`${this.endTimeHour} ${event}`);
  }
}
