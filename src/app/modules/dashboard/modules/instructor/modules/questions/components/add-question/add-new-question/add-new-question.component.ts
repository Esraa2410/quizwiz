import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from './../../../services/questions.service';
import { HelperService } from './../../../../../../../../shared/services/helper.service';
import { IQuestion } from '../../../models/questions';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss'],
})
export class AddNewQuestionComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewQuestionComponent>,
    private questionsService: QuestionsService,
    private helperService: HelperService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formCreation();
    this.handleData();
  }

  formCreation(): void {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      options: this.fb.group({
        A: ['', Validators.required],
        B: ['', Validators.required],
        C: ['', Validators.required],
        D: ['', Validators.required],
      }),
      answer: ['', Validators.required],
      difficulty: ['', Validators.required],
      type: ['BE', Validators.required],
    });
  }

  submitForm(): void {
    if (this.questionForm.valid) {
      if (this.data.mode == 'add') {
        this.onAddQuestion();
      } else if (this.data.mode == 'edit') {
        this.onEditQuestion()
      }
    } else if (this.data.mode == 'delete') {
      this.onDeleteQuestion();
    }
  }

  onAddQuestion(): void {
    this.questionsService.addQuestion(this.questionForm.value).subscribe({
      next: (res: any) => {
        this.helperService.success(res.message);
      },
      error: (err: any) => {
        this.helperService.error(err);
      },
      complete: () => {
        this.onNoClick();
      },
    });
  }

  onEditQuestion(): void {
    this.questionsService
      .updateQuestion(this.data._id, this.questionForm.value)
      .subscribe({
        next: (res: any) => {
          this.helperService.success(res.message);
        },
        error: (err: any) => {
          this.helperService.error(err);
        },
        complete: () => {
          this.onNoClick();
        },
      });
  }

  onDeleteQuestion(): void {
    this.questionsService.deleteQuestion(this.data._id).subscribe({
      next: (res: any) => {
        this.helperService.success(res.message);
      },
      error: (err: any) => {
        this.helperService.error(err);
      },
      complete: () => {
        this.onNoClick();
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleData(): void {
    if (this.data) {
      if (this.data) {
        this.questionForm.setValue({
          title: this.data.title,
          description: this.data.description,
          options: {
            A: this.data.options.A,
            B: this.data.options.B,
            C: this.data.options.C,
            D: this.data.options.D,
          },
          answer: this.data.answer,
          difficulty: this.data.difficulty,
          type: this.data.type,
        });

        if (this.data.mode == 'view' || this.data.mode == 'delete') {
          this.questionForm.disable();
        }
      }
    }
  }


}
