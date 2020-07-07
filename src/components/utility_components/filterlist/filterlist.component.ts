import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filterlist.component.html',
  styleUrls: ['./filterlist.component.sass']
})
export class FilterlistComponent implements OnInit, OnChanges {
  expanded = false;
  filteredList = [];
  value = '';
  selectedItem;

  @Input() highlightOnFocus: boolean;
  @Input() itemsList: Array<any>;
  @Input() maxListElements: number;
  @Input() propertiesForDisplay: Array<string>;
  @Input() idProperty: string;
  @Input() initialId: string;
  @Input() placeholder: string;
  @Input() virtualSelectedItem: string;
  @Output() itemSelected = new EventEmitter<string>();
  @Output() itemSelectedObject = new EventEmitter<any>();

  constructor(private _elementRef: ElementRef) {}

  toggle() {
    this.expanded = !this.expanded;
  }

  ngOnChanges(change: any) {
    if (change.virtualSelectedItem && change.virtualSelectedItem.currentValue) {
      this.value = change.virtualSelectedItem.currentValue;
    }

    if (change.initialId && change.initialId.currentValue) {
      const initialItem = this.itemsList.find(item => {
        return item[this.idProperty] === change.initialId.currentValue;
      });
      // tslint:disable-next-line:curly
      if (initialItem) this.handleItemSelection(initialItem);
    }
  }

  ngOnInit() {
    this.setFilteredElements();
    if (this.initialId && this.itemsList.length > 0) {
      const item = this.itemsList.find(ele => ele[this.idProperty] === this.initialId);
      // tslint:disable-next-line:curly
      if (item) this.handleItemSelection(item);
    }
  }

  handleItemSelection(item) {
    this.expanded = false;
    this.value = this.getItemCaption(item);
    this.itemSelected.emit(item[this.idProperty]);
    this.itemSelectedObject.emit(item);
    this.selectedItem = item;
  }

  getItemCaption(item) {
    if (typeof item === 'object') {
      let result = '';
      for (const val of this.propertiesForDisplay) {
        result += `${item[val]} `;
      }
      return result.trim();
    } else if (typeof item === 'string') {
      return item;
    } else {
      return (<any>item).toString();
    }
  }

  @HostListener('document:click', ['$event.target']) onOutsideClick = element => {
    if (!this._elementRef.nativeElement.contains(element) && this.expanded) {
      this.toggle();
    }
  };

  setFilteredElements() {
    if (!this.value) {
      this.filteredList = [];
      for (let index = 0; index < this.maxListElements; index++) {
        // tslint:disable-next-line:curly
        if (this.itemsList[index]) this.filteredList.push(this.itemsList[index]);
      }
    } else {
      this.filteredList = this.itemsList.reduce((acum, ele): any => {
        const eleStr = this.getItemCaption(ele).toUpperCase();
        if (eleStr.indexOf(this.value.toUpperCase()) !== -1) {
          // tslint:disable-next-line:curly
          if (acum.length < this.maxListElements) acum.push(ele);
        }
        return acum;
      }, []);
    }
  }

  typeOwner(event) {
    this.setFilteredElements();
  }

  focusOut() {
    if (!this.selectedItem) {
      const typedItem = this.itemsList.find(item => {
        return this.value === this.getItemCaption(item);
      });
      if (typedItem) {
        this.handleItemSelection(typedItem);
      } else {
        this.itemSelected.emit('');
        this.itemSelectedObject.emit(null);
        this.value = '';
        // The following toggle causes the dropdown to disappear before a (click)
        // event can fire on the list. For this reason we use (mousedown) in the template
        // so that the focusOut is called after the selection of the item is handled
        this.toggle();
      }
    }
  }

  focusIn(event) {
    this.toggle();
    this.selectedItem = undefined;
    this.setFilteredElements();
    if (this.highlightOnFocus) {
      // Use setTimeout trick to get iPad and other browsers to set the selection range
      setTimeout(() => {
        event.target.setSelectionRange(0, 9999);
      }, 1);
    }
  }
}
