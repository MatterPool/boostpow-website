import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'toUsdOrDefault'
})
export class ToUsdOrDefaultPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, args?: any): any {
    if (args.length && args[0] && Number(value) === 0) {
      return args;
    }
    return this.currencyPipe.transform(value, 'USD');
  }
}
