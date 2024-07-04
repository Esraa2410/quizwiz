import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
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

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.scss'],
})
export class StudentQuizComponent implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChild('answer', { static: true }) answer!: ElementRef<HTMLDivElement>;
  @ViewChild('questionContainer', { static: true })
  questionContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLDivElement>;
  @ViewChild('search', { static: true }) search!: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true })
  progress!: ElementRef<HTMLDivElement>;
  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLUListElement>;
  @ViewChild('elementToAnswer', { static: true })
  elementToAnswer!: QueryList<ElementRef<HTMLDivElement>>;

  currentQuestionIndex = 0;
  progressValue: number = 0;
  timer: number = 30;
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
    private _Router: Router
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
    gsap.from(this.menu.nativeElement.childNodes, {
      delay: 0.4,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.search.nativeElement.childNodes, {
      delay: 0.8,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.logo.nativeElement, {
      delay: 0.3,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.actions.nativeElement.childNodes, {
      delay: 0.6,
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
    if (this.timer > 0 && !this.quizCompleted) {
      this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
      this.updateSelectedAnswer();
    }
  }

  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== undefined;
  }

  updateSelectedAnswer(): void {
    this.answer.nativeElement.childNodes.forEach((node: any, index: number) => {
      if (node.classList && node.classList.contains('answer')) {
        if (this.selectedAnswers[this.currentQuestionIndex] === index) {
          node.classList.add('selected');
        } else {
          node.classList.remove('selected');
        }
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
          this.resetTimer();
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
      this.currentQuestionIndex <
        (this.quiz?.data.questions.length || 0) - 1 &&
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
          this.resetTimer();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.2,
          });
        },
      });
    } else if (!this.quizCompleted) {
      this.submitQuiz();
    }
  }

  getStudentQuizWithoutAnswers(id: string): void {
    this._StudentQuizService.quizWithoutAnswer(id).subscribe({
      next: (res: IStudentQuiz) => {
        this.quiz = res;
        this.increaseProgressValue();
        this._ChangeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this._HelperService.error(error);
        if (error.status === 403) {
          this.quizCompleted = true;
          this._Router.navigate(['/'])
        }
      },
      complete: () => {
        this._HelperService.success('Quiz Submitted');
        this._Router.navigate(['/'])
      }
    });
  }

  submitQuiz(): void {
    if (this.quizCompleted) {
      return;
    }

    const answers = this.selectedAnswers.map((answer, index) => ({
      question: this.quiz.data.questions[index]._id,
      answer: this.optionKeys[answer],
    }));
    const quizData: ISubmitQuizReq = { answers };
    this._StudentQuizService.submitQuiz(quizData, this.quiz.data._id).subscribe({
      next: (res: any) => {
        this._Router.navigate(['/']);
        this.quizCompleted = true;
        this._HelperService.success(res.message);
      },
      error: (error: HttpErrorResponse) => {
        this._HelperService.error(error);
        if (error.status === 403) {
          this.quizCompleted = true;
        }
      },
    });
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.goToNextQuestion();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timer = 30;
  }
}
