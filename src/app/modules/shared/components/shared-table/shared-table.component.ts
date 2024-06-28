import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IButtonConfig } from '../../models/shared';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedTableComponent<T extends { [key: string]: any }> implements OnChanges {
  @Input() tableHeaders: string[] = [];
  @Input() tableBodyContent: T[] = [];
  @Input() displayHeaders: { [key: string]: string } = {};
  @Input() buttons: IButtonConfig[] = [];
  filteredTableBodyContent: { row: T; keys: string[] }[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  @Input() actionsVisivilty: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableHeaders'] || changes['tableBodyContent']) {
      this.updateFilteredTableBodyContent();
    }
  }

  updateFilteredTableBodyContent(): void {
    if (this.tableBodyContent) {
      this.filteredTableBodyContent = this.tableBodyContent.map((row) => ({
        row,
        keys: this.getFilteredKeys(row),
      }));
      this.sortTable();
    } else {
      this.filteredTableBodyContent = [];
    }
  }

  getFilteredKeys(object: T): string[] {
    return this.tableHeaders.filter(
      (key) => object.hasOwnProperty(key) || key.includes('.')
    );
  }

  sortTable(): void {
    if (this.sortColumn) {
      this.filteredTableBodyContent.sort((a, b) => {
        const valueA = this.getNestedValue(a.row, this.sortColumn);
        const valueB = this.getNestedValue(b.row, this.sortColumn);
        return this.sortDirection === 'asc'
          ? this.compareValues(valueA, valueB)
          : this.compareValues(valueB, valueA);
      });
    }
  }

  compareValues(valueA: any, valueB: any): number {
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortTable();
  }

  getNestedValue(object: T, key: string): any {
    return key.split('.').reduce((o, k) => (o ? o[k] : null), object);
  }

  trackByRowId(index: number, item: { row: T; keys: string[] }): any {
    return item.row['_id'];
  }
}
