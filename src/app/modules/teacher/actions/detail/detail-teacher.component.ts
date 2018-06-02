import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
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
    private alertService: AlertService,
    private loadingService: LoadingService
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
      this.title = "Excluir Professor";
      this.excluir = true;
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingService.loading(true);
      this.teacherService.detail(_id).subscribe(teacher => {
        this.teacher = <Teacher>teacher;
        this.loadingService.loading(false);
      }, err => {
        this.alertService.error(err);
    });
  }

  delete() {
    this.teacherService.delete(this.teacher.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/professor']);
      },
      error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  goBack() {
    this.location.back();
  }
}