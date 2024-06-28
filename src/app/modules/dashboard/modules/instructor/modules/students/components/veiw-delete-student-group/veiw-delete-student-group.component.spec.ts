import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwDeleteStudentGroupComponent } from './veiw-delete-student-group.component';

describe('VeiwDeleteStudentGroupComponent', () => {
  let component: VeiwDeleteStudentGroupComponent;
  let fixture: ComponentFixture<VeiwDeleteStudentGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwDeleteStudentGroupComponent]
    });
    fixture = TestBed.createComponent(VeiwDeleteStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
