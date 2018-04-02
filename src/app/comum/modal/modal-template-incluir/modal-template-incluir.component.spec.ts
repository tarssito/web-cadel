import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemplateIncluirComponent } from './modal-template-incluir.component';

describe('ModalTemplateIncluirComponent', () => {
  let component: ModalTemplateIncluirComponent;
  let fixture: ComponentFixture<ModalTemplateIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTemplateIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTemplateIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
