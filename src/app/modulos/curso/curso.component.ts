import { Component, OnInit } from '@angular/core';

import { Curso } from './shared/curso.model';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit {
  listaCurso: Curso[] = [];

  constructor() { }

  ngOnInit() {
    this.listaCurso.push(
      {
        id: 1,
        nome: 'Ciências da Computação'
      },
      {
        id: 2,
        nome: 'Engenharia da Computação'
      },
      {
        id: 3,
        nome: 'Sistemas de Informação'
      }
    );
  }

}
