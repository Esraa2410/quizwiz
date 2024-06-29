import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwDeleteQuestionComponent } from './veiw-delete-question.component';

describe('VeiwDeleteQuestionComponent', () => {
  let component: VeiwDeleteQuestionComponent;
  let fixture: ComponentFixture<VeiwDeleteQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwDeleteQuestionComponent]
    });
    fixture = TestBed.createComponent(VeiwDeleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
