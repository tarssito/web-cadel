import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { SysMessages } from './../../../../common/mensagens/messages';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { SubjectService } from './../../shared/subject.service';
import { Subject } from './../../shared/subject.model';

@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html'
})
export class DetailSubjectComponent {
  subject: Subject;
  title: String;
  excluir: Boolean;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init
    this.subject = new Subject();
    this.title = "Detalhes da Disciplina";
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
      this.title = "Excluir Disciplina";
      this.excluir = true;
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingService.loading(true);
    this.subjectService.detail(_id).subscribe(subject => {
      this.subject = <Subject>subject;
      this.loadingService.loading(false);
    }, err => {
      console.log(err);
    });
  }

  delete() {
    this.subjectService.delete(this.subject.id)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(3), ['/disciplina']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  goBack() {
    this.location.back();
  }
}