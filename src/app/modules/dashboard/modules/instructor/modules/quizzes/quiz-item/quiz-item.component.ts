import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzesService } from '../services/quizzes.service';
import { GroupsService } from '../../groups/services/groups.service';
import { IGroupsListRes, IGroupsListRes2 } from '../../groups/models/groups';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {

  groupList: IGroupsListRes2[] = [];
  AddNewQuizForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private _QuizzesService: QuizzesService,
              private _GroupService: GroupsService,
              public dialogRef: MatDialogRef<QuizItemComponent>
              , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.AddNewQuizForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      questions_number: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      schadule: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      score_per_question: new FormControl('', [Validators.required]),
      students: new FormControl('', [Validators.required])
   
    });

    this.getAllGroups();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllGroups() {

    this._GroupService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupList = res;
        console.log(res)

        // console.log(res)
      }, error: (err: HttpErrorResponse) => {
      }
    })

  }
  submit(addNewQuizForm: FormGroup) {
    this.dialogRef.close(addNewQuizForm.value);
    console.log(addNewQuizForm.value)
  }

}
