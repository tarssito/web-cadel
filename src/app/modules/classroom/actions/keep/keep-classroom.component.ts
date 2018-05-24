import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../../../common/mensagens/messages';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';

import { Course } from './../../../course/shared/course.model';
import { CourseService } from './../../../course/shared/course.service';

import { Subject } from './../../../subject/shared/subject.model';
import { SubjectService } from './../../../subject/shared/subject.service';

import { Class } from './../../../class/shared/class.model';
import { ClassService } from './../../../class/shared/class.service';

import { Classroom } from './../../shared/classroom.model';
import { ClassroomService } from './../../shared/classroom.service';

import { SERVER_URL } from './../../../../common/api.config';

@Component({
  selector: 'app-keep-classroom',
  templateUrl: './keep-classroom.component.html'
})
export class KeepClassroomComponent {
  currentYear: number;
  labelBtn: String;
  title: String;
  classroom: Classroom;
  courseList: Course[];
  subjectList: Subject[];
  classList: Class[];
  periodList: any[];
  ageList: any[];
  shiftList: any[];
  weekdaysList: any[];
  successCode: Number;

  constructor(
    private _sanitizer: DomSanitizer,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService,
    private classService: ClassService,
    private classroomService: ClassroomService
  ) {
    //init
    this.currentYear = new Date().getFullYear();
    this.classroom = new Classroom();
    this.courseList = [];
    this.subjectList = [];
    this.classList = [];
    this.periodList = [];
    this.ageList = [];
    this.shiftList = [];
    this.weekdaysList = [];
    this.title = "Incluir Classe";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.loadCourses();
    this.loadPeriod();
    this.loadAge();
    this.loadShift();
    this.loadWeekdays();
    this.loadClass();
    this.detail();
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

  private loadSubject(): void {
    this.loadingService.loading(true);
    this.subjectService.list(new Subject())
      .subscribe(data => {
        this.subjectList = <Subject[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  private loadClass(): void {
    this.loadingService.loading(true);
    this.classService.list(new Class())
      .subscribe(data => {
        this.classList = <Class[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.loadSubject();
      this.title = "Alterar Classe";
      this.labelBtn = "Alterar";
      this.successCode = 2;

      this.loadingService.loading(true);
      this.classroomService.detail(_id).subscribe(_classroom => {
        this.classroom = <Classroom>_classroom;
        this.loadingService.loading(false);
        if (!this.classroom) {
          this.router.navigate(['/classe']);
        }
      }, error => {
        this.alertService.error(error);
      });
    }
  }

  onChangeCourse() {
    this.classroom.disciplina = new Subject();
    this.subjectList = [];
    if (this.classroom.curso.id) {
      this.loadSubject();
    }
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

  private loadShift(): void {
    this.shiftList.push({ id: 'M', label: 'Matutino' });
    this.shiftList.push({ id: 'V', label: 'Vespertino' });
    this.shiftList.push({ id: 'N', label: 'Noturno' });
  }

  private loadWeekdays(): void {
    this.weekdaysList.push({ id: 1, label: 'Segunda-feira' });
    this.weekdaysList.push({ id: 2, label: 'Terça-feira' });
    this.weekdaysList.push({ id: 3, label: 'Quarta-feira' });
    this.weekdaysList.push({ id: 4, label: 'Quinta-feira' });
    this.weekdaysList.push({ id: 5, label: 'Sexta-feira' });
    this.weekdaysList.push({ id: 6, label: 'Sábado' });
  }

}