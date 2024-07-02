import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicdate',
})
export class DynamicdatePipe implements PipeTransform {
  transform(value: any, key: string): any {
    switch (key) {
      case 'createdAt':
      case 'updatedAt':
      case 'schadule':
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString('en-US');
        } else {
          return value;
        }
      default:
        return value;
    }
  }
}
