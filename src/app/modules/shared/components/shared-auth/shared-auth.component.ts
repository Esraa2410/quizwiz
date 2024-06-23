import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormsField } from '../../models/shared';
import { gsap } from 'gsap';

@Component({
  selector: 'app-shared-auth',
  templateUrl: './shared-auth.component.html',
  styleUrls: ['./shared-auth.component.scss']
})
export class SharedAuthComponent implements AfterViewInit {
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLHeadingElement>;
  @ViewChild('authButtons', { static: true }) authButtons!: ElementRef<HTMLDivElement>;
  @ViewChild('formData', { static: true }) formData!: ElementRef<HTMLFormElement>;
  @ViewChild('header', { static: true }) header!: ElementRef<HTMLHeadingElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('imgBx', { static: true }) imgBx!: ElementRef<HTMLDivElement>;
  @ViewChild('authBx', { static: true }) authBx!: ElementRef<HTMLDivElement>;

  private _ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() authHeader: string = '';
  @Input() toggleSignupSignInVisibility: boolean = false;
  @Input() authForm: FormGroup = new FormGroup({});
  @Input() formFields: IFormsField[] = [];
  @Input() navigationText: string = '';
  @Input() btnText: string = '';
  @Input() navigationLink: string = '';
  @Input() IfnavigationLink: boolean = false;
  @Output() formSubmission: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideNewPassword: boolean = true;

  userToken: string = localStorage.getItem('userToken') ?? '';

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    if (this.logo) {
      gsap.from(this.logo.nativeElement, {
        delay: 0.3,
        duration: 0.4,
        opacity: 0,
        y: -20,
      });
    }

    if (this.header) {
      gsap.from(this.header.nativeElement, {
        delay: 0.4,
        duration: 0.4,
        opacity: 0,
        y: -20,
      });
    }

    if (this.authButtons) {
      gsap.from(Array.from(this.authButtons.nativeElement.children), {
        delay: 0.5,
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
      });
    }

    if (this.formData) {
      gsap.from(Array.from(this.formData.nativeElement.children), {
        delay: 0.6,
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
      });
    }

    if (this.actions) {
      gsap.from(Array.from(this.actions.nativeElement.children), {
        delay: 0.7,
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
      });
    }

    if (this.imgBx) {
      gsap.from(this.imgBx.nativeElement, {
        delay: 0.8,
        duration: 0.4,
        opacity: 0,
        y: -20,
      });
    }

    if (this.authBx) {
      gsap.from(this.imgBx.nativeElement, {
        delay: 0.8,
        duration: 0.4,
        opacity: 0,
        y: -20,
      });
    }
  }

  onSubmit(authForm: FormGroup) {
    if (authForm.valid) {
      this.formSubmission.emit(authForm);
    }
  }
}
