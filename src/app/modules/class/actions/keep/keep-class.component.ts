import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-keep-class',
  templateUrl: './keep-class.component.html'
})
export class KeepClassComponent {
  labelBtn: String;
  title: String;
  mySource: any;
  selectedStudent: any;

  constructor( private _sanitizer: DomSanitizer) {
    this.title = "Incluir Turma";
    this.labelBtn = "Incluir";

    this.mySource = [{
      id: 1,
      nome: "Fulano",
      matricula: "02932093"
    }, {
      id: 2,
      nome: "Ciclano",
      matricula: "02932094"
    }];
  }

  public findStudents() {
    return { data: { results: []} };
  }

  public renderStudent(data: any): SafeHtml {
    const html = `<b style='float:left;width:100%'>${data.matricula}</b>
            <span>${data.nome}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
