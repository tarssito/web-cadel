import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { StudentService } from './../../shared/student.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
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
    private alertService: AlertService,
    private loadingservice: LoadingService
  ) {
    //init
    this.student = new Student();
    this.title = "Detalhes do Aluno";
    this.excluir = false;
    this.checkAction();
    this.detail();
  }

  /* Check if action is to delete or detail */
  private checkAction() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const urlSegment: UrlSegment[] = urlSegmentGroup.segments;

    if (urlSegment.find(_urlSegment => _urlSegment.path === 'excluir')) {
      this.title = "Excluir Aluno";
      this.excluir = true;
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingservice.loading(true);
    this.studentService.detail(_id).subscribe(student => {
      this.student = <Student>student;
      this.loadingservice.loading(false);
    }, err => {
      this.alertService.error(err);
    });
  }

  delete() {
    this.loadingservice.loading(true);
    this.studentService.delete(this.student.id)
      .subscribe(
      data => {
        this.loadingservice.loading(false);
        this.alertService.success(SysMessages.get(3), ['/aluno']);
      },
      data => {
        this.loadingservice.loading(false);
        this.alertService.error(data.error.msg);
      });
  }

  goBack() {
    this.location.back();
  }
}
