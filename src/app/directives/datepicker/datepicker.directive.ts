import { Directive, ElementRef, Input, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { Moment } from 'moment';

// Needed to import with require because problem with require
declare var require: any;
const pikaday = require('pikaday');

@Directive({ selector: '[appDatepicker]' })
export class DatepickerDirective implements OnInit {
  element: any;
  picker: any;
  options: any;

  /* tslint:disable:no-input-rename */
  @Input('appDatepicker') callBack: Function;
  /* tslint:enable:no-input-rename */
  @Input() initialDate: Moment;
  @Input() identifier: string;
  @Input() minDate: Date;
  @Input() disableMinDate: boolean;
  @Input() setDefaultDate = true;
  @Input() contained = true;
  @Input() bound = true;
  @Input() theme: string;
  @Input() refreshCallback: any;
  @Input() disableWeekends = false;
  @Input() selectedDate: Moment;
  @Input() disableDayFn: Function;

  @HostBinding('style.cursor')
  cursor = 'pointer';

  constructor(el: ElementRef, private ref: ChangeDetectorRef) {
    this.element = el.nativeElement;
  }

  bindOptions() {
    this.options = {
      defaultDate: this.initialDate ? this.initialDate.toDate() : undefined,
      setDefaultDate: this.setDefaultDate,
      format: 'MM/DD/YYYY',
      trigger: this.element.hasAttribute('disabled') ? null : this.element,
      bound: this.bound,
      theme: this.theme,
      disableWeekends: this.disableWeekends,
      onSelect: (date: any) => {
        this.callBack(date, this.identifier);
      },
      disableDayFn: this.disableDayFn,
      keyboardInput: false
    };

    if (this.contained) {
      this.options.container = this.element;
      this.options.field = this.element;
    } else {
      this.options.field = this.element;
    }

    /**
     * If the minDate is required, then add it in.
     * Some date pickers allow free form (Editing historical data in the past)
     */
    if (!this.disableMinDate) {
      this.options['minDate'] = this.minDate;
    }
  }

  ngOnInit() {
    // debugger
    this.bindOptions();
    this.picker = new pikaday(this.options);
    if (this.refreshCallback) {
      this.refreshCallback['refreshCallback'] = () => {
        this.ref.detectChanges();
        this.bindOptions();
        this.picker.gotoDate(this.initialDate.toDate());
      };

      this.refreshCallback['setSelectedDate'] = (date: Moment) => {
        this.picker.setMoment(date);
      };
    }
  }
}
