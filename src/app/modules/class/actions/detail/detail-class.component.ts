import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { Class } from './../../shared/class.model';
import { ClassService } from './../../shared/class.service';
import { Shifts } from '../../../../common/shift/shift';

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html'
})
export class DetailClassComponent {
  class: Class;
  title: String;
  excluir: Boolean;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private classService: ClassService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init
    this.class = new Class();
    this.title = "Detalhes da Turma";
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
      this.title = "Excluir Turma";
      this.excluir = true;
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingService.loading(true);
    this.classService.detail(_id).subscribe(_class => {
      this.class = <Class>_class;
      this.formatShiftDescription(this.class.turnoLetivo);
      this.loadingService.loading(false);
    }, err => {
      this.alertService.error(err);
    });
  }

  delete() {
    this.classService.delete(this.class.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/turma']);
      },
      error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private formatShiftDescription(id: string) {
    this.class.turnoLetivo = Shifts.get(id).label;
  }

  goBack() {
    this.location.back();
  }
}