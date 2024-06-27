import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicdate'
})
export class DynamicdatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
