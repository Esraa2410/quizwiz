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
        return new Date(value).toLocaleDateString();
      default:
        return value;
    }
  }
}
