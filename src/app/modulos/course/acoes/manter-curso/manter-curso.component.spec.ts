import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterCursoComponent } from './manter-curso.component';

describe('ManterCursoComponent', () => {
  let component: ManterCursoComponent;
  let fixture: ComponentFixture<ManterCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
