import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCardComponent } from './shared-card.component';

describe('SharedCardComponent', () => {
  let component: SharedCardComponent;
  let fixture: ComponentFixture<SharedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedCardComponent]
    });
    fixture = TestBed.createComponent(SharedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
