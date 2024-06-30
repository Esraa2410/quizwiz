import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormsField } from '../../models/shared';
import { gsap } from 'gsap';

@Component({
  selector: 'app-shared-auth',
  templateUrl: './shared-auth.component.html',
  styleUrls: ['./shared-auth.component.scss'],
})
export class SharedAuthComponent implements AfterViewInit {
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLHeadingElement>;
  @ViewChild('authButtons', { static: true })
  authButtons!: ElementRef<HTMLDivElement>;
  @ViewChild('formData', { static: true })
  formData!: ElementRef<HTMLFormElement>;
  @ViewChild('header', { static: true })
  header!: ElementRef<HTMLHeadingElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('imgBx', { static: true }) imgBx!: ElementRef<HTMLDivElement>;
  @ViewChild('authBx', { static: true }) authBx!: ElementRef<HTMLDivElement>;
  @ViewChild('toggleAuthBtn', { static: false }) toggleAuthBtn!: ElementRef<HTMLDivElement>;

  private _ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() authHeader: string = '';
  @Input() toggleSignupSignInVisibility: boolean = false;
  @Input() authForm: FormGroup = new FormGroup({});
  @Input() formFields: IFormsField[] = [];
  @Input() navigationText: string = '';
  @Input() btnText: string = '';
  @Input() navigationLink: string = '';
  @Input() IfnavigationLink: boolean = false;
  @Output() formSubmission: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  hidePassword: boolean = true;
  hideNewPassword: boolean = true;

  userToken: string = localStorage.getItem('userToken') ?? '';

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    if (this.logo) {
      gsap.fromTo(this.logo.nativeElement, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.3, duration: 0.4 }
      );
    }

    if (this.header) {
      gsap.fromTo(this.header.nativeElement,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.4, duration: 0.4 }
      );
    }

    if (this.formData) {
      gsap.fromTo(Array.from(this.formData.nativeElement.children),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.6, duration: 0.4, stagger: 0.15 }
      );
    }

    if (this.actions) {
      gsap.fromTo(Array.from(this.actions.nativeElement.children),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.7, duration: 0.4, stagger: 0.15 }
      );
    }

    if (this.toggleAuthBtn && this.toggleAuthBtn.nativeElement) {
      gsap.fromTo(Array.from(this.toggleAuthBtn.nativeElement.children),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.7, duration: 0.4, stagger: 0.15 }
      );
    }

    if (this.imgBx) {
      gsap.fromTo(this.imgBx.nativeElement,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.8, duration: 0.4 }
      );
    }

    if (this.authBx) {
      gsap.fromTo(this.authBx.nativeElement,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.8, duration: 0.4 }
      );
    }
  }

  onSubmit(authForm: FormGroup) {
    if (authForm.valid) {
      this.formSubmission.emit(authForm);
    }
  }
}
