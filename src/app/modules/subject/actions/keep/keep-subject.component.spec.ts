import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepSubjectComponent } from './keep-subject.component';

describe('KeepSubjectComponent', () => {
  let component: KeepSubjectComponent;
  let fixture: ComponentFixture<KeepSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
