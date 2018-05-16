import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keep-class',
  templateUrl: './keep-class.component.html'
})
export class KeepClassComponent {
  labelBtn: String;
  title: String;

  constructor() {
    this.title = "Incluir Turma";
    this.labelBtn = "Incluir";
  }

}
