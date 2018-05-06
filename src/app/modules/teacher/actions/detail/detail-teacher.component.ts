import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { TeacherService } from './../../shared/teacher.service';
import { Teacher } from './../../shared/teacher.model';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html'
})
export class DetailTeacherComponent {
  teacher: Teacher;
  title: String;
  excluir: Boolean;

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
    this.title = "Detalhes do Professor";
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
    this.activateRoute.params.subscribe(params => {
      this.teacherService.detail(params['id']).subscribe(teacher => {
        this.teacher = <Teacher>teacher;
      });
    });
  }

  delete() {
    this.teacherService.delete(this.teacher.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/professor']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  goBack() {
    this.location.back();
  }
}