import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepClassComponent } from './keep-class.component';

describe('KeepClassComponent', () => {
  let component: KeepClassComponent;
  let fixture: ComponentFixture<KeepClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
