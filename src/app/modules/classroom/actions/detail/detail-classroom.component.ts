import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { Classroom } from './../../shared/classroom.model';
import { ClassroomService } from './../../shared/classroom.service';
import { Shifts } from '../../../../common/shift/shift';

@Component({
  selector: 'app-detail-classroom',
  templateUrl: './detail-classroom.component.html'
})
export class DetailClassroomComponent {
  classroom: Classroom;
  title: String;
  excluir: Boolean;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private classService: ClassroomService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init
    this.classroom = new Classroom();
    this.title = "Detalhes da Classe";
    this.excluir = false;
    this.checkAction();
    this.detail();
  }

  /* Check if action is to delete or detail */
  private checkAction() {
    var tree: UrlTree = this.router.parseUrl(this.router.url);
    var urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    var urlSegment: UrlSegment[] = urlSegmentGroup.segments;

    if (urlSegment.find(_urlSegment => _urlSegment.path === 'excluir')) {
      this.title = "Excluir Classe";
      this.excluir = true;
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingService.loading(true);
    this.classService.detail(_id).subscribe(_class => {
      this.classroom = <Classroom>_class;
      this.formatShiftDescription(this.classroom.turno);
      this.loadingService.loading(false);
    }, err => {
      this.alertService.error(err);
    });
  }

  delete() {
    this.classService.delete(this.classroom.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/classe']);
      },
      error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private formatShiftDescription(id: string) {
    this.classroom.turno = Shifts.get(id).label;
  }

  goBack() {
    this.location.back();
  }
}