import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentQuizService } from '../../service/studentQuiz.service';
import {
  IStudentQuiz,
  IStudentQuizQuestion,
  IStudentQuizOptions,
} from '../../models/studentQuiz';
import gsap from 'gsap';

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

  quizId: string = '';
  currentQuestionIndex = 0;
  progressValue: number = 0;

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
    private _StudentQuizService: StudentQuizService
  ) {}

  ngOnInit(): void {
    this.initAnimations();
    this.routeCheck();
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

  ngAfterViewInit(): void {
    this.hello();
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

  hello() {
    this.elementToAnswer.forEach((item) => {
      console.log(item);
    });
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
    this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
    this.updateSelectedAnswer();
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
    if (this.currentQuestionIndex > 0) {
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
      this.currentQuestionIndex <
      (this.quiz?.data.questions.length || 0) - 1
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
    }
  }

  routeCheck(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.quizId = params['id'];
      this.getStudentQuizWithoutAnswers(this.quizId);
    });
  }

  getStudentQuizWithoutAnswers(id: string): void {
    this._StudentQuizService.quizWithoutAnswer(id).subscribe({
      next: (res: IStudentQuiz) => {
        this.quiz = res;
        console.log(this.quiz)
        this.increaseProgressValue();
        this._ChangeDetectorRef.detectChanges();
      },
    });
  }
}
