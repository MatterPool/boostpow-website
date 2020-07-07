import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spFilterText',
  pure: false
})
export class FilterTextPipe implements PipeTransform {
  checkText(item: string, filter: string): boolean {
    const sItem = item.trim().toLocaleLowerCase();
    const sFilter = filter.trim().toLocaleLowerCase();
    return sItem.indexOf(sFilter) >= 0;
  }

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => {
      /* tslint:disable:curly */
      if (typeof item === 'string') return this.checkText(item, filter);
      /* tslint:enable:curly */
      return this.checkText(item.caption, filter);
    });
  }
}
