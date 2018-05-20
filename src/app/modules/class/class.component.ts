import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Course } from './../course/shared/course.model';
import { CourseService } from './../course/shared/course.service';

import { Class } from './shared/class.model';
import { ClassService } from './shared/class.service';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html'
})
export class ClassComponent {
  currentYear: number;
  filter: Class;
  classList: Class[];
  courseList: Course[];
  periodList: any[];
  ageList: any[];

  //dependency injection
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService
  ) {
    this.currentYear = new Date().getFullYear();
    this.filter = new Class();
    this.classList = [];
    this.courseList = [];
    this.periodList = [];
    this.ageList = [];
    this.loadCourses();
    this.loadPeriod();
    this.loadAge();
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.classService.list(this.filter)
      .subscribe(data => {
        this.classList = <Class[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  private loadPeriod(): void {
    this.periodList.push({ id: 1, label: 1 });
    this.periodList.push({ id: 2, label: 2 });
  }

  private loadAge(): void {
    for (let i = 0; i < 10; i++) {
      this.ageList.push({ id: this.currentYear + i, label: this.currentYear + i });
    }
  }

  private loadCourses(): void {
    this.loadingService.loading(true);
    this.courseService.list(new Course())
      .subscribe(data => {
        this.courseList = <Course[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  goBack(): void {
    this.location.back();
  }

}