import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatNumber',
})
export class FloatNumberPipe implements PipeTransform {
  transform(value: any, key: string): any {
    if (key === 'avg_score' && typeof value === 'number') {
      return `${value.toFixed(2)}%`;
    }
    return value;
  }
}
