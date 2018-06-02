import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';
import { Weekdays } from './../../common/weekdays/weekdays';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Course } from './../course/shared/course.model';
import { CourseService } from './../course/shared/course.service';

import { Classroom } from './shared/classroom.model';
import { ClassroomService } from './shared/classroom.service';
import { PAGINATION } from './../../common/pagination.config';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html'
})
export class ClassroomComponent {
  currentYear: number;
  filter: Classroom;
  classroomList: any;
  courseList: any;
  periodList: any[];
  ageList: any[];
  weekdaysList: any[];
  PAGINATION: any;

  //dependency injection
  constructor(
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService
  ) {
    //init
    this.PAGINATION = PAGINATION;
    this.currentYear = new Date().getFullYear();
    this.filter = new Classroom();
    this.classroomList = [];
    this.courseList = [];
    this.periodList = [];
    this.weekdaysList = [];
    this.ageList = [];
    this.loadCourses();
    this.loadPeriod();
    this.loadAge();
    this.loadWeekdays();
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.classroomService.list(this.filter)
      .subscribe(data => {
        this.classroomList = data;
        this.formatWeekdayDescription();
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private formatWeekdayDescription() {
    this.classroomList.forEach(item => {
      item.descricaoDia = Weekdays.get(item.dia).label;
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
        this.courseList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private loadWeekdays(): void {
    this.weekdaysList = Weekdays.getAll();
  }

  goBack(): void {
    this.location.back();
  }

}