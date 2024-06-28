import { HelperService } from './../../../../../../../../shared/services/helper.service';
import { QuestionsService } from './../../../services/questions.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStudentGroupComponent } from '../../../../students/components/add-student-group/add-student-group.component';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss']
})
export class AddNewQuestionComponent {
  // formData = {
  //   title: '',
  //   description: '',
  //   options: {
  //     A: '',
  //     B: '',
  //     C: '',
  //     D: ''
  //   },
  //   answer: '',
  //   difficulty: '',
  //   type: 'BE' // Default value can be set here
  // };

  formData = {
    title: '',
    description: '',
    options: {
      A: '',
      B: '',
      C: '',
      D: ''
    } as { [key: string]: string }, // Explicitly define the type of options
    answer: '',
    difficulty: '',
    type: 'BE'
  };

  // Extract keys for options dynamically
  get optionKeys() {
    return Object.keys(this.formData.options);
  }

  submitForm() {
    console.log(this.formData); // Replace with your form submission logic
    // Example: Call your API service to send this.formData to your API
    this.QuestionsService.addStudent(this.formData).subscribe({
      next:(res:any)=>{
        this.HelperService.success(res.message)
        
        
      },
      error:(err:any)=>{
        this.HelperService.error(err)
      }, complete: () => {
              this.onNoClick();
            }
    })
  }


  constructor( public dialogRef: MatDialogRef<AddNewQuestionComponent>, private QuestionsService:QuestionsService, private HelperService:HelperService){}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
