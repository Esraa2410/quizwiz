import {
  IGroupDetailsRes,
  IStudent,
  IGroupsListRes,
  IGroupsListRes2,
} from './../../../groups/models/groups';
import {
  IButtonConfig,
  IBreadCrumb,
} from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { Root2 } from '../../models/results';
import { Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupsService } from '../../../groups/services/groups.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface IResults {
  title: string;
  participants: number;
  createdAt: string;
  groupName: string;
  personsInGroup: number;
  actions: () => void;
}

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent implements OnInit {
  groupsIds: string[] = [];
  resultsData: IResults[] = [];
  paginatedResultsData!: IResults[];
  resultsList!: Root2[];
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Results' },
  ];

  buttons: IButtonConfig[] = [
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction('1000ms', '1000ms', row),
      class: 'yellow-color',
    },
  ];

  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  constructor(
    public dialog: MatDialog,
    private _ResultsService: ResultsService,
    private _GroupsService: GroupsService,
    private _Router: Router
  ) {}

  studentsGroup: IStudent[] = [];
  groupDetails: IGroupDetailsRes[] = [
    {
      _id: '',
      name: '',
      status: '',
      instructor: '',
      students: this.studentsGroup,
      max_students: 0,
    },
  ];

  ngOnInit(): void {
    this.getAllResults();
  }

  getAllResults() {
    forkJoin({
      groups: this._GroupsService.getAllGroups(),
      results: this._ResultsService.allResults(),
    })
      .pipe(
        map(({ groups, results }) => {
          this.resultsList = results;
          return results.map((result) => {
            const group = groups.find((g) => g._id === result.quiz.group);
            return {
              groupName: group?.name ?? 'Group Deleted',
              createdAt: result.quiz.createdAt,
              participants: result.participants.length ?? 0,
              personsInGroup: group?.students.length ?? 0,
              title: result.quiz.title ?? '',
              actions: () => this.viewFunction('1000ms', '1000ms', result)
            } as IResults;
          });
        })
      )
      .subscribe((combinedResults) => {
        this.resultsData = combinedResults;
        this.totalRecords = combinedResults.length;
        this.updatePaginatedData();
      });
  }

  viewFunction(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    row: Root2
  ): void {
    this._ResultsService.getResultView(row);
    this._Router.navigate(['/dashboard/instructor/results/results-view']);
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedResultsData = this.resultsData.slice(start, end);
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
