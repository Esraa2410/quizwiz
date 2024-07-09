import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentQuizService } from '../../service/studentQuiz.service';
import {
  IStudentQuiz,
  IStudentQuizQuestion,
  IStudentQuizOptions,
  ISubmitQuizReq,
} from '../../models/studentQuiz';
import gsap from 'gsap';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizTimesUpComponent } from '../quiz-times-up/quiz-times-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.scss'],
})
export class StudentQuizComponent implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChildren('answer') answers!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('questionContainer', { static: true })
  questionContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true })
  progress!: ElementRef<HTMLDivElement>;
  @ViewChild('timerElement', { static: true })
  timerElement!: ElementRef<HTMLDivElement>;

  currentQuestionIndex = 0;
  progressValue: number = 0;
  timer: any = 0;
  totalQuizTime: number = 0;
  intervalId: any;
  quizCompleted: boolean = false;

  quiz: IStudentQuiz = {
    data: {
      _id: '',
      code: '',
      title: '',
      description: '',
      status: '',
      instructor: '',
      group: '',
      questions_number: 0,
      questions: [],
      schadule: '',
      duration: 0,
      score_per_question: 0,
      type: '',
      difficulty: '',
      updatedAt: '',
      createdAt: '',
      __v: 0,
    },
  };

  selectedAnswers: number[] = [];

  optionKeys: (keyof IStudentQuizOptions)[] = ['A', 'B', 'C', 'D'];

  constructor(
    private _ChangeDetectorRef: ChangeDetectorRef,
    private _ActivatedRoute: ActivatedRoute,
    private _StudentQuizService: StudentQuizService,
    private _HelperService: HelperService,
    private _Router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.getStudentQuizWithoutAnswers(params['id']);
    });
    this.initAnimations();
  }

  ngAfterViewInit(): void {
    this.startTimer();
  }

  initAnimations(): void {
    gsap.from(this.main.nativeElement, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.questionContainer.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.progress.nativeElement.childNodes, {
      delay: 0.7,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
  }

  get question(): IStudentQuizQuestion {
    return (
      this.quiz?.data.questions[this.currentQuestionIndex] || {
        _id: '',
        title: '',
        options: { A: '', B: '', C: '', D: '', _id: '' },
      }
    );
  }

  increaseProgressValue(): void {
    this.progressValue =
      (100 * (this.currentQuestionIndex + 1)) /
      (this.quiz?.data.questions_number || 1);
    if (this.currentQuestionIndex == 0) {
      gsap.to(this.slider.nativeElement, {
        delay: 0.7,
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    } else {
      gsap.to(this.slider.nativeElement, {
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    }
  }

  onSelect(answerIndex: number): void {
    if (this.timer > '0:00' && !this.quizCompleted) {
      this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
      this.updateSelectedAnswer();
      this._ChangeDetectorRef.detectChanges();
    } else {
    }
  }

  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== undefined;
  }

  updateSelectedAnswer(): void {
    this.answers.forEach((answer, index) => {
      if (this.selectedAnswers[this.currentQuestionIndex] === index) {
        answer.nativeElement.classList.add('selected');
      } else {
        answer.nativeElement.classList.remove('selected');
      }
    });
  }

  prev(): void {
    if (this.currentQuestionIndex > 0 && !this.quizCompleted) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex--;
          this.increaseProgressValue();
          this._ChangeDetectorRef.detectChanges();
          this.updateSelectedAnswer();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.15,
          });
        },
      });
    }
  }

  goToNextQuestion(): void {
    if (
      this.currentQuestionIndex < (this.quiz?.data.questions.length || 0) - 1 &&
      !this.quizCompleted
    ) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex++;
          this.increaseProgressValue();
          this._ChangeDetectorRef.detectChanges();
          this.updateSelectedAnswer();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.2,
          });
        },
      });
    } else if (this.currentQuestionIndex === (this.quiz?.data.questions.length || 0) - 1 && !this.quizCompleted) {
      this.submitQuiz();
    }
  }

  getStudentQuizWithoutAnswers(id: string): void {
    this._StudentQuizService.quizWithoutAnswer(id).subscribe({
      next: (res: IStudentQuiz) => {
        this.quiz = res;
        this.totalQuizTime = this.quiz.data.duration * 60;
        this.startTimer();
      },
      error: (error: HttpErrorResponse) => {
        this._HelperService.error(error);
        if (error.status === 403 || error.status === 409) {
          this.quizCompleted = true;
          this._Router.navigate(['/dashboard/student/quizzes']);
        }
      },
      complete: () => {
        this.increaseProgressValue();
        this._ChangeDetectorRef.detectChanges();
      },
    });
  }

  submitQuiz(): void {
    if (!this.quizCompleted) {
      const answers = this.selectedAnswers.map((answer, index) => ({
        question: this.quiz.data.questions[index]._id,
        answer: this.optionKeys[answer],
      }));
      const quizData: ISubmitQuizReq = { answers };
      this.quizCompleted = true;
      this._StudentQuizService
        .submitQuiz(quizData, this.quiz.data._id)
        .subscribe({
          next: (res: any) => {
            this._Router.navigate(['/dashboard/student/quizzes']);
            this._HelperService.success(res.message);
          },
          error: (error: HttpErrorResponse) => {
            this._HelperService.error(error);
            if (error.status === 403) {
              this.quizCompleted = true;
            } else {
              this.quizCompleted = false;
            }
          },
        });
    } else {
    }
  }

  startTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (this.totalQuizTime > 0) {
        this.totalQuizTime--;
        this.updateTimerVisuals();
      } else {
        this.submitQuiz();
        clearInterval(this.totalQuizTime)
        //console.log(this.totalQuizTime)
       this.openTimesUpDialog('500ms','500ms')
      }
    }, 1000);
  }

  updateTimerVisuals(): void {
    const minutes = Math.floor(this.totalQuizTime / 60);
    const seconds = this.totalQuizTime % 60;
    this.timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (this.totalQuizTime <= 60) {
      this.changeBackgroundToRed();
    }
  }

  changeBackgroundToRed(): void {
    this.timerElement.nativeElement.style.backgroundColor = 'red';
  }

  isAnyQuestionSelected(): boolean {
    return this.selectedAnswers.some((answer) => answer !== undefined);
  }

  resetQuiz(): void {
    this.selectedAnswers = [];
    this.currentQuestionIndex = 0;
    this.progressValue = 0;
    this.quizCompleted = false;
    this.increaseProgressValue();
    this.startTimer();
  }
  openTimesUpDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(QuizTimesUpComponent, {
      width: '400px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {  });
  }
}
