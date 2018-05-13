import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';

import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { SubjectService } from './../../shared/subject.service';
import { Subject } from './../../shared/subject.model';

@Component({
  selector: 'app-keep-subject',
  templateUrl: './keep-subject.component.html'
})
export class KeepSubjectComponent {
  subject: Subject;
  title: String;
  labelBtn: String;
  successCode: Number;

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
    this.title = "Incluir Disciplina";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.detail();
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.title = "Alterar Disciplina";
      this.labelBtn = "Alterar";
      this.successCode = 2;

      this.loadingService.loading(true);
      this.subjectService.detail(_id).subscribe(course => {
        this.subject = <Subject>course;
        this.loadingService.loading(false);
        if (!this.subject) {
          this.router.navigate(['/disciplina']);
        }
      }, error => {
        this.alertService.error(error);
      });
    }
  }

  private valid() {
    if (!this.subject.nome || !this.subject.cargaHoraria) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (this.subject.cargaHoraria == 0) {
      this.alertService.error(SysMessages.get(10));
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.valid()) {
      this.subjectService.keep(this.subject)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/disciplina']);
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