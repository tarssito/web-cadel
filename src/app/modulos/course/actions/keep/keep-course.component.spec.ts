import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepCourseComponent } from './keep-course.component';

describe('KeepCourseComponent', () => {
  let component: KeepCourseComponent;
  let fixture: ComponentFixture<KeepCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
