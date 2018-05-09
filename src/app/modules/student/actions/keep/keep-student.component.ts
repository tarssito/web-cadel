import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Utils } from './../../../../helpers/utils/utils';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
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
  successCode: Number;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init
    this.student = new Student();
    this.title = "Incluir Aluno";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.detail();
    this.loadGenderList();
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.loadingService.loading(true);
      this.title = "Alterar Aluno";
      this.labelBtn = "Alterar";
      this.successCode = 2;

      this.studentService.detail(_id).subscribe(student => {
        this.student = <Student>student;
        this.loadingService.loading(false);
        if (!this.student) {
          this.router.navigate(['/aluno']);
        }
      }, error => {
        console.log(error);
      });
    }
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

    if (!Utils.validateCpf(this.student.cpf)) {
      this.alertService.error(SysMessages.get(6));
      return false;
    }

    if (!Utils.validateEmail(this.student.email)) {
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
      this.loadingService.loading(true);
      this.studentService.keep(this.student)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/aluno']);
          this.loadingService.loading(false);
        },
        error => {
          console.log(error);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
