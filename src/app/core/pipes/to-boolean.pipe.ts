import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toBoolean'
})
export class ToBooleanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? true : false
  }

}
