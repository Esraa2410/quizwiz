import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwDeleteStudentComponent } from './veiw-delete-student.component';

describe('VeiwDeleteStudentComponent', () => {
  let component: VeiwDeleteStudentComponent;
  let fixture: ComponentFixture<VeiwDeleteStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwDeleteStudentComponent]
    });
    fixture = TestBed.createComponent(VeiwDeleteStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
