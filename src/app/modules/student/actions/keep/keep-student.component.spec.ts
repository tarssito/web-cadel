import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepStudentComponent } from './keep-student.component';

describe('KeepStudentComponent', () => {
  let component: KeepStudentComponent;
  let fixture: ComponentFixture<KeepStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
