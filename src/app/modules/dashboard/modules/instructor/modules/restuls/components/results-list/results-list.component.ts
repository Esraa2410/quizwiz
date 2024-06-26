import { IButtonConfig, IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { Root2 } from '../../models/results';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultsViewComponent } from '../results-view/results-view.component';
import { GroupsService } from '../../../groups/services/groups.service';

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

  tableHeaders: string[] = ['quiz.title', 'quiz.group', 'participants', 'participants.length', 'quiz.schadule', 'actions'];
  displayHeaders: { [key: string]: string } = {
    'quiz.title': 'Title',
    'quiz.group': 'Group Name',//will change to group name
    'participants': 'No. of persons in group',//will change to number of students in the group
    'participants.length': 'Participants',
    'quiz.schadule': 'Date',//will change to date pipe
    actions: 'Actions',
  };

  buttons: IButtonConfig[] = [
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction('1000ms','1000ms', row),
      class: 'yellow-color',
    },
  ];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  constructor(public dialog: MatDialog, private _ResultsService: ResultsService, private _GroupsService: GroupsService, private _Router: Router) { }
  ngOnInit(): void {
    this.getAllResults()

  }

  getAllResults() {
    this._ResultsService.allResults().subscribe({
      next: (res: Root2[]) => {
        this.resultsList = res;
      }
    })
  }



  viewFunction(enterAnimationDuration: string,
    exitAnimationDuration: string, row: Root2): void {
    // this._Router.navigate([`/dashboard/instructor/results/results-view/${row.quiz._id}`]);
    // console.log(row)

    const dialogRef = this.dialog.open(ResultsViewComponent, {
      width: '850px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        data: row
      }
    });
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
