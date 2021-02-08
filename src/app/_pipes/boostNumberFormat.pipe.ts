import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boostNumberFormat',
  pure: false
})
export class BoostNumberFormatPipe implements PipeTransform {
  transform(value: number, exponent?: boolean):number {
    let val: any;
    if(exponent){
      if(value>9999){
        val = parseInt(value.toExponential(1).toString().split("e+").pop());
      }
    } else {
      val = (value > 9999) ? parseInt(value.toExponential(1).toString().split("e+").shift()) : value;
    }
    return val;
  }
}
