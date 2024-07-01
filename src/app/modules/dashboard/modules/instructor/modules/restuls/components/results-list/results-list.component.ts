import { IButtonConfig, IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { Root2 } from '../../models/results';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';
@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {

  resultsList!: Root2[];
  paginatedList!: Root2[];
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Results' },
  ];

  tableHeaders: string[] = ['quiz.title', 'quiz.description', 'quiz.difficulty', 'actions'];
  displayHeaders: { [key: string]: string } = {
    title: 'Quiz Title',
    description: 'Quiz Desc',
    difficulty: 'Quiz Difficulty',
    actions: 'Actions',
  };

  buttons: IButtonConfig[] = [
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction(row),
      class: 'yellow-color',
    },
  ];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  constructor(private _ResultsService: ResultsService ,private _Router:Router) { }
  ngOnInit(): void {
    this.getAllResults()

  }

  getAllResults() {
    this._ResultsService.allResults().subscribe({
      next: (res: Root2[]) => {
        this.resultsList = res;
        console.log(this.resultsList)
      }
    })
  }


  viewFunction(row: Root2): void {
    this._Router.navigate([`/dashboard/instructor/results/results-view/${row.quiz._id}`]);
    console.log(row)
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedList = this.resultsList.slice(start, end);
  }

  onPageSizeChange(size: number): void {
    this.rows = size;
    this.first = 0;
    this.updatePaginatedData();
  }

  onPageNumberChange(page: number): void {
    this.first = (page - 1) * this.rows;
    this.updatePaginatedData();
  }
}
