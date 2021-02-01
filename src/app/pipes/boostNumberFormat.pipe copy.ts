import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boostNumberFormat',
  pure: false
})
export class BoostNumberFormatPipe implements PipeTransform {
  transform(value: number) {
    let val = Math.round(value);
    val = val > 999 ? val.toExponential(1).toString().split("e+") : [val];
    return val;
  }
}
