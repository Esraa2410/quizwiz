import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMainHeaderComponent } from './shared-main-header.component';

describe('SharedMainHeaderComponent', () => {
  let component: SharedMainHeaderComponent;
  let fixture: ComponentFixture<SharedMainHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedMainHeaderComponent]
    });
    fixture = TestBed.createComponent(SharedMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
