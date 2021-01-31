import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boostNumberFormat',
  pure: false
})
export class BoostNumberFormatPipe implements PipeTransform {
  transform(value: number) {
    const val = Math.round(value);
    return val > 9999 ? value.toExponential(1) : val;
  }
}
