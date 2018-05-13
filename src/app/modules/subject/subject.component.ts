import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Subject } from './shared/subject.model';
import { SubjectService } from './shared/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent {
  filter: Subject;
  subjectList: Subject[];

  //dependency injection
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    this.filter = new Subject();
    this.subjectList = [];
    this.search();
  }

  search(): void {
    this.subjectList = JSON.parse(localStorage.getItem('disciplinas')) || [];
  }

  goBack(): void {
    this.location.back();
  }

}
