import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormsField } from '../../models/shared';

@Component({
  selector: 'app-shared-auth',
  templateUrl: './shared-auth.component.html',
  styleUrls: ['./shared-auth.component.scss']
})
export class SharedAuthComponent {
  @Input() AuthHeader: string = 'Continue your learning journey with QuizWiz!';
  @Input() toggleSignupSignInVisibility: boolean = false;
  @Input() authForm: FormGroup = new FormGroup({});
  @Input() formFields: IFormsField[] = [];
  @Input() navigationText: string = '';
  @Input() btnText: string = '';
  @Input() navigationLink: string = '';
  @Output() formSubmission: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  hidePassword: boolean = false;
  hideConfirmPassword: boolean = false;

  userToken: string = localStorage.getItem('userToken') ?? '';

  onSubmit(authForm: FormGroup) {
    if (authForm.valid) {
      this.formSubmission.emit(authForm);
    }
  }
}
