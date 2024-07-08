import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTimesUpComponent } from './quiz-times-up.component';

describe('QuizTimesUpComponent', () => {
  let component: QuizTimesUpComponent;
  let fixture: ComponentFixture<QuizTimesUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTimesUpComponent]
    });
    fixture = TestBed.createComponent(QuizTimesUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
