import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from './../../../services/questions.service';
import { HelperService } from './../../../../../../../../shared/services/helper.service';

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formCreation();
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
      console.log('Form Submitted', this.questionForm.value);
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
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
