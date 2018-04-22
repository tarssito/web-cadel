import { Component, OnInit } from '@angular/core';
import { Curso } from './../../shared/curso.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manter-curso',
  templateUrl: './manter-curso.component.html'
})
export class ManterCursoComponent implements OnInit {
  title = "Incluir Curso";
  curso = new Curso();
  labelBotaoSubmit = "Incluir";

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltar() {
    this.location.back();
  }

}
