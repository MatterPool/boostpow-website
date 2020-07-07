import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown-filterlist',
  templateUrl: './dropdown-filterlist.component.html',
  styleUrls: ['./dropdown-filterlist.component.sass']
})
export class DropdownFilterComponent {
  expanded = false;
  filterValue = '';

  @Input() itemsList: Array<any>;
  @Input() initialValueText: string;
  @Input() disabled = false;
  @Output() itemSelected = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {}

  toggle() {
    this.filterValue = '';
    // Only let toggle happen if not disabled
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  focusOut() {
    this.expanded = false;
  }

  handleItemSelection(item) {
    this.toggle();
    this.itemSelected.emit(item);
  }

  getItemCaption(item) {
    /* tslint:disable:curly */
    if (typeof item === 'string') return item;
    /* tslint:enable:curly */
    return item.caption;
  }

  isItemText(item) {
    return typeof item === 'string';
  }

  @HostListener('document:click', ['$event.target']) onOutsideClick = element => {
    if (!this._elementRef.nativeElement.contains(element) && this.expanded) {
      this.toggle();
    }
  };
}
