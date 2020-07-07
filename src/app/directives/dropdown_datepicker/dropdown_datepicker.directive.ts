import { Directive, ElementRef, Input, OnInit, OnChanges, HostBinding, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
// Needed to import with require because problem with require
declare var require: any;
const Pikaday = require('pikaday');

@Directive({ selector: '[appDropdownDatepicker]' })
export class DropdownDatepickerDirective implements OnInit, OnChanges {
  element: any;
  /* tslint:disable:no-input-rename */
  @Input('appDropdownDatepicker') callBack: Function;
  /* tslint:enable:no-input-rename */
  @Input() initialDate: Date;
  @Input() identifier: string;
  @Input() minDate: Date;
  @Input() disableMinDate: boolean;
  @Input() position: string;

  @HostBinding('style.cursor')
  cursor = 'pointer';
  picker: any;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const options = {
      field: this.element,
      defaultDate: this.initialDate ? new Date(this.initialDate) : undefined,
      setDefaultDate: true,
      format: 'MM/DD/YYYY',
      trigger: this.element.hasAttribute('disabled') ? null : this.element,
      onSelect: date => {
        this.callBack(date, this.identifier);
      },
      keyboardInput: false
    };
    /**
     * If the minDate is required, then add it in.
     * Some date pickers allow free form (Editing historical data in the past)
     */
    if (!this.disableMinDate) {
      options['minDate'] = this.minDate;
    }

    if (this.position) {
      options['position'] = this.position;
    }

    this.picker = new Pikaday(options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.initialDate && changes.initialDate.currentValue !== changes.initialDate.previousValue) {
      this.setDate(changes.initialDate.currentValue);
    }
  }

  setDate(newDate): void {
    if (this.picker) {
      this.picker.setMoment(moment(newDate));
      this.picker.adjustPosition();
    }
  }
}
