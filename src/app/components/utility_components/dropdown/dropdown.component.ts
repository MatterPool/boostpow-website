import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent {
  expanded = false;
  @Input() itemsList: Array<any>;
  @Input() initialValueText: string;
  @Input() disabled = false;
  @Input() inline = false;
  @Output() itemSelected = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {}

  toggle() {
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
