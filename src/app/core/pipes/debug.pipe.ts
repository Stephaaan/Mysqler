import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'debug'
})
export class DebugPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('%c [DEBUG]: %c', 'color: red', 'color: white', value)
    return "";
  }

}
