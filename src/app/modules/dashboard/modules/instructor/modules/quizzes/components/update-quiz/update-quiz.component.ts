import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuiz, IQuizResponse, IQuizResponseByID, Question } from '../../models/quizzes';
import { QuizzesService } from '../../services/quizzes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroupsListRes, IGroupsListRes2 } from '../../../groups/models/groups';
import { GroupsService } from '../../../groups/services/groups.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  editquizForm!: FormGroup;
  quizData: IQuizResponseByID = {
    _id: "",
    code: "",
    title: "",
    description: "",
    status: "",
    instructor: "",
    group: "",
    questions_number: 0,
    questions: [],
    schadule: "",
    duration: 0,
    score_per_question: 0,
    type: "",
    difficulty: "",
    updatedAt: "",
    createdAt: "",
    __v: 0
  };
  /**/
  title: string = ''
  description!: string
  schadule!: string
  duration!: number
  score_per_question!: number;
  group!: string;


  groupList: IGroupsListRes2[] = [];
  constructor(private formBuilder: FormBuilder,
    private _GroupService: GroupsService,
    private _QuizzesService: QuizzesService,
    public dialogRef: MatDialogRef<UpdateQuizComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit() {
    this.editquizForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      group: ['', [Validators.required]],
      schadule: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      score_per_question: ['', [Validators.required]],

    });
    if (this.data.id) {
      this.getQuizById(this.data.id);
    }

    this.getAllGroups();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(editquizForm: FormGroup) {
    this.dialogRef.close(editquizForm.value);
  }
  getQuizById(id: string) {
    this._QuizzesService.getQuizByID(id).subscribe({
      next: (res: IQuizResponseByID) => {
        this.quizData = res;
      },
      error: () => {

      }, complete: () => {
      },
    })

  }
  getAllGroups() {

    this._GroupService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupList = res;
      }, error: (err: HttpErrorResponse) => {
      }
    })

  }

}
