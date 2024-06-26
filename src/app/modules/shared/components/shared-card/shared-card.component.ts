import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss']
})
export class SharedCardComponent<T extends { [key: string]: any }> {
  @Input() imgSrc: string = '';
  @Input() mainHeader!: (item: T) => string;
  @Input() cardDetailsFContent!: (item: T, index?: number) => string;
  @Input() cardDetailsSContent!: (item: T) => string;
  @Input() numOfStudents!: (item: T) => number;
  @Input() studentsVisibility: boolean = false;
  @Input() addPinkBackground: boolean = false;
  @Input() mainIconVisibility: boolean = false;

  @Input() cardContent: T[] = [];
}
