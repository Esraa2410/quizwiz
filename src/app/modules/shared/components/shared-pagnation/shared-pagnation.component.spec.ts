import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPagnationComponent } from './shared-pagnation.component';

describe('SharedPagnationComponent', () => {
  let component: SharedPagnationComponent;
  let fixture: ComponentFixture<SharedPagnationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedPagnationComponent]
    });
    fixture = TestBed.createComponent(SharedPagnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
