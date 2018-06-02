import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';
import { CourseService } from './../course/shared/course.service';

import { Subject } from './shared/subject.model';
import { Course } from './../course/shared/course.model';
import { SubjectService } from './shared/subject.service';
import { PAGINATION } from './../../common/pagination.config';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent {
  filter: Subject;
  subjectList: any;
  courseList: any;
  PAGINATION: any;

  //dependency injection
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService
  ) {
    this.PAGINATION = PAGINATION;
    this.filter = new Subject();
    this.subjectList = [];
    this.courseList = [];
    this.loadCourses();
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.subjectService.list(this.filter)
      .subscribe(data => {
        this.subjectList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private loadCourses(): void {
    this.loadingService.loading(true);
    this.courseService.list(this.filter)
      .subscribe(data => {
        this.courseList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  goBack(): void {
    this.location.back();
  }

}
