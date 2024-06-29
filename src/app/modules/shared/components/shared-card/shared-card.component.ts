import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicdatePipe } from '../../pipes/date/dynamicdate.pipe';
import { FloatNumberPipe } from '../../pipes/floatNumber/floatNumber.pipe';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss'],
  providers: [FloatNumberPipe, DynamicdatePipe]
})
export class SharedCardComponent<T extends { [key: string]: any }> {
  @Input() imgSrc: string = '';
  @Input() headerKeys!: string[];
  @Input() detailKeys!: string[];
  @Input() additionalContentKey!: string;
  @Input() studentsVisibility: boolean = false;
  @Input() addPinkBackground: boolean = false;
  @Input() mainIconVisibility: boolean = false;
  @Input() mainMenue: boolean = false;
  @Input() inGoup: boolean = false;

  @Input() cardContent: T[] = [];
  @Input() useGrid: boolean = false;
  @Input() wontUseGrid: boolean = false;
  @Input() items!: MenuItem[];
  @Output() view = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() updateStudentGroup = new EventEmitter<any>();
  @Output() deleteStudentGroup = new EventEmitter<string>();

  @Input() RouterLinkPath: string = '';

  getHeaderContent(item: T): string {
    return this.headerKeys.map(key => item[key]).join(' ');
  }

  getDetailsContent(item: T, index: number): { key: string, value: any }[] {
    return this.detailKeys.map(key => ({
      key,
      value: item[key]
    }));
  }

  getAdditionalContent(item: T): number {
    return item[this.additionalContentKey];
  }

  isLastElement(element: any, array: any[]): boolean {
    return array.indexOf(element) === array.length - 1;
  }
}
