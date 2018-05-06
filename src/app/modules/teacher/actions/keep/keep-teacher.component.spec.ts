import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepTeacherComponent } from './keep-teacher.component';

describe('KeepTeacherComponent', () => {
  let component: KeepTeacherComponent;
  let fixture: ComponentFixture<KeepTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
