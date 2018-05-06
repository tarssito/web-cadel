import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Utils } from './../../../../helpers/utils/utils';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { TeacherService } from './../../shared/teacher.service';
import { Teacher } from './../../shared/teacher.model';

@Component({
  selector: 'app-keep-teacher',
  templateUrl: './keep-teacher.component.html'
})
export class KeepTeacherComponent {
  teacher: Teacher;
  genderList: any[];
  title: String;
  labelBtn: String;
  successCode: Number;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private alertService: AlertService
  ) {
    //init
    this.teacher = new Teacher();
    this.title = "Incluir Professor";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.detail();
    this.loadGenderList();
  }

  private detail() {
    this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        // this.studentService.detail(params['id']).subscribe(student => {
        //   this.student = <Student>student;

        //   if (this.student.id) {
        //     this.title = "Alterar Aluno";
        //     this.labelBtn = "Alterar";
        //     this.successCode = 2;
        //   }
        // });
      }
    });
  }

  private valid() {
    if (!this.teacher.nome || !this.teacher.matricula || !this.teacher.cpf || !this.teacher.email || !this.teacher.sexo) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (Number(this.teacher.matricula) == 0) {
      this.alertService.error(SysMessages.get(9));
      return false;
    }

    if (!Utils.validateCpf(this.teacher.cpf)) {
      this.alertService.error(SysMessages.get(6));
      return false;
    }

    if (!Utils.validateEmail(this.teacher.email)) {
      this.alertService.error(SysMessages.get(5));
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
      this.teacherService.keep(this.teacher)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/professor']);
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