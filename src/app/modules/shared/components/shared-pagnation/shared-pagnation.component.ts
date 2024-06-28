import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-shared-pagnation',
  templateUrl: './shared-pagnation.component.html',
  styleUrls: ['./shared-pagnation.component.scss']
})
export class SharedPagnationComponent {
  @Input() rowsPerPage: number[] = [];
  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() width: number = 50;
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageNumberChanged: EventEmitter<number> = new EventEmitter<number>();

  first: number = 0;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    const page = Math.floor(this.first / this.rows) + 1;
    this.pageSizeChanged.emit(this.rows);
    this.pageNumberChanged.emit(page);
  }
}
