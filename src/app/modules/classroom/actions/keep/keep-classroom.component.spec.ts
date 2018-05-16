import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepClassroomComponent } from './keep-classroom.component';

describe('KeepClassroomComponent', () => {
  let component: KeepClassroomComponent;
  let fixture: ComponentFixture<KeepClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
