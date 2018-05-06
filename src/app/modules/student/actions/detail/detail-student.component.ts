import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { StudentService } from './../../shared/student.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { Student } from './../../shared/student.model';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html'
})
export class DetailStudentComponent {
  student: Student;
  title: String;
  excluir: Boolean;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private alertService: AlertService
  ) {
    //init
    this.student = new Student();
    this.title = "Detalhes do Aluno";
    this.excluir = false;
    this.detail();
  }

  private detail() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const urlSegment: UrlSegment[] = urlSegmentGroup.segments;

    if (urlSegment.find(_urlSegment => _urlSegment.path === 'excluir')) {
      this.title = "Excluir Aluno";
      this.excluir = true;
    }

    this.activateRoute.params.subscribe(params => {
      this.studentService.detail(params['id']).subscribe(student => {
        this.student = <Student>student;
      });
    });
  }

  delete() {
    this.studentService.delete(this.student.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/aluno']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  goBack() {
    this.location.back();
  }
}
