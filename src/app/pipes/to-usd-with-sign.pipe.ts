import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'toUsdWithSign'
})
export class ToUsdWithSignPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, args?: any): any {
    let res = this.currencyPipe.transform(value, 'USD');
    res = value > 0 ? `+ ${res}` : res;
    res = value < 0 ? `-  ${res.substr(1)}` : res;
    return res && res.trim();
  }
}
