import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsVeiwComponent } from './results-veiw.component';

describe('ResultsVeiwComponent', () => {
  let component: ResultsVeiwComponent;
  let fixture: ComponentFixture<ResultsVeiwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsVeiwComponent]
    });
    fixture = TestBed.createComponent(ResultsVeiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
