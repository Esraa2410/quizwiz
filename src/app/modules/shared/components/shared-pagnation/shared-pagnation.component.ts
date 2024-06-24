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
  @Output() pageSizeChanged:EventEmitter<number> =new EventEmitter<number>();
  @Output() pageNumberChanged:EventEmitter<number> =new EventEmitter<number>();

  first: number = 0;
  rows: number = 10;
  page: number = 0;
  size: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = Math.floor(this.first / this.rows) + 1;
    this.size = this.rows;
    this.pageSizeChanged.emit(this.size);
    this.pageNumberChanged.emit(this.page);
  }

}
