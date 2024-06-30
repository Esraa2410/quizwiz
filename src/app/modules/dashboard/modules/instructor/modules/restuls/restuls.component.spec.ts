import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestulsComponent } from './restuls.component';

describe('RestulsComponent', () => {
  let component: RestulsComponent;
  let fixture: ComponentFixture<RestulsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestulsComponent]
    });
    fixture = TestBed.createComponent(RestulsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
