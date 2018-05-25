import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Course } from './../course/shared/course.model';
import { CourseService } from './../course/shared/course.service';

import { Classroom } from './shared/classroom.model';
import { ClassroomService } from './shared/classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html'
})
export class ClassroomComponent {
  currentYear: number;
  filter: Classroom;
  classroomList: Classroom[];
  courseList: Course[];
  periodList: any[];
  ageList: any[];
  weekdaysList: any[];

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
    // this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.classroomService.list(this.filter)
      .subscribe(data => {
        this.classroomList = <Classroom[]>data;
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

  private loadWeekdays(): void {
    this.weekdaysList.push({ id: 1, label: 'Segunda-feira' });
    this.weekdaysList.push({ id: 2, label: 'Terça-feira' });
    this.weekdaysList.push({ id: 3, label: 'Quarta-feira' });
    this.weekdaysList.push({ id: 4, label: 'Quinta-feira' });
    this.weekdaysList.push({ id: 5, label: 'Sexta-feira' });
    this.weekdaysList.push({ id: 6, label: 'Sábado' });
  }

  goBack(): void {
    this.location.back();
  }

}