import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';
import { Teacher } from './shared/teacher.model';
import { TeacherService } from './shared/teacher.service';
import { SysMessages } from './../../common/mensagens/messages';
import { PAGINATION } from './../../common/pagination.config';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {
  filter: Teacher;
  teacherList: any;
  PAGINATION: any;

  //dependency injection
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init;
    this.PAGINATION = PAGINATION;
    this.filter = new Teacher();
    this.teacherList = [];
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.teacherService.list(this.filter)
      .subscribe(data => {
        this.teacherList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  goBack(): void {
    this.location.back();
  }
}