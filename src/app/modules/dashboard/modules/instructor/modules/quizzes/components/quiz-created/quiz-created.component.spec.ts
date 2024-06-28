import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreatedComponent } from './quiz-created.component';

describe('QuizCreatedComponent', () => {
  let component: QuizCreatedComponent;
  let fixture: ComponentFixture<QuizCreatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizCreatedComponent]
    });
    fixture = TestBed.createComponent(QuizCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
