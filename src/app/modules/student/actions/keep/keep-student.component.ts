import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Utils } from './../../../../helpers/utils/utils';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { StudentService } from './../../shared/student.service';
import { Student } from './../../shared/student.model';

@Component({
  selector: 'app-keep-student',
  templateUrl: './keep-student.component.html'
})
export class KeepStudentComponent {
  student: Student;
  genderList: any[];
  title: String;
  labelBtn: String;

  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private alertService: AlertService
  ) {
    //init
    this.student = new Student();
    this.title = "Incluir Aluno";
    this.labelBtn = "Incluir";
    this.detail();
    this.loadGenderList();
  }

  private detail() {
    this.activateRoute.params.subscribe(params => {
      this.studentService.detail(params['id']).subscribe(student => {
        this.student = <Student>student;

        if (this.student.id) {
          this.title = "Alterar Aluno";
          this.labelBtn = "Alterar";
        }
      });
    });
  }

  private valid() {
    if (!this.student.nome || !this.student.matricula || !this.student.cpf) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (Number(this.student.matricula) == 0) {
      this.alertService.error(SysMessages.get(9));
      return false;
    }

    if (!Utils.validateEmail(this.student.email)) {
      this.alertService.error(SysMessages.get(5));
      return false;
    }

    if (!Utils.validateCpf(this.student.cpf)) {
      this.alertService.error(SysMessages.get(6));
      return false;
    }
    return true;
  }

  private loadGenderList() {
    this.genderList = [];
    this.genderList.push({
      id: 'M',
      description: 'Masculino'
    });
    this.genderList.push({
      id: 'F',
      description: 'Feminino'
    });
  }

  onSubmit() {
    if (this.valid()) {
      this.studentService.keep(this.student)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(1), ['/aluno']);
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
