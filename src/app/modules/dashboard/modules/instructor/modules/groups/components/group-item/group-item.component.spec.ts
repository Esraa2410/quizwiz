import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemComponent } from './group-item.component';

describe('GroupItemComponent', () => {
  let component: GroupItemComponent;
  let fixture: ComponentFixture<GroupItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupItemComponent]
    });
    fixture = TestBed.createComponent(GroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
