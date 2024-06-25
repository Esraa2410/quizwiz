import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwGroupComponent } from './veiw-group.component';

describe('VeiwGroupComponent', () => {
  let component: VeiwGroupComponent;
  let fixture: ComponentFixture<VeiwGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwGroupComponent]
    });
    fixture = TestBed.createComponent(VeiwGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
