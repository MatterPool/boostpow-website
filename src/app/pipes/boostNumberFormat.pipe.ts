import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boostNumberFormat',
  pure: false
})
export class BoostNumberFormatPipe implements PipeTransform {
  transform(value: number, exponent?: boolean) {
    let val = Math.round(value);
    if(exponent){
      val = (val > 9999) ? parseInt(val.toExponential(1).toString().split("e+").pop()) : null;
    } else {
      val = (val > 9999) ? parseFloat(val.toExponential(1).toString().split("e+").shift()) : val;
    }
    return val;
  }
}
