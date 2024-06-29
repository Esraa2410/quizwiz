import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss']
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
  @Output() groupId = new EventEmitter<string>();
  @Input() item: any;

  onDeleteStudentGroup(studenttId: string) {
    this.deleteStudentGroup.emit(studenttId);
  }




  viewItem(studenttId: string) {
    this.view.emit(studenttId);
  }

  deleteItem(studenttId: string) {
    this.delete.emit(studenttId);
  }


  @Input() RouterLinkPath:string=''

  getHeaderContent(item: T): string {
    return this.headerKeys.map(key => item[key]).join(' ');
  }

  getDetailsContent(item: T, index: number): string[] {
    return this.detailKeys.map(key => item[key]);
  }

  getAdditionalContent(item: T): number {
    return item[this.additionalContentKey];
  }

  isLastElement(element: any, array: any[]): boolean {
    return array.indexOf(element) === array.length - 1;
  }

}
