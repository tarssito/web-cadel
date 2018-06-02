import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Weekdays } from './../../../../common/weekdays/weekdays';
import { Shifts } from './../../../../common/shift/shift';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';

import { Course } from './../../../course/shared/course.model';
import { CourseService } from './../../../course/shared/course.service';

import { Subject } from './../../../subject/shared/subject.model';
import { SubjectService } from './../../../subject/shared/subject.service';

import { Teacher } from './../../../teacher/shared/teacher.model';
import { TeacherService } from './../../../teacher/shared/teacher.service';

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
  courseList: any;
  subjectList: any;
  teacherList: any;
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
    private teacherService: TeacherService,
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
    this.teacherList = [];
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
        this.courseList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private loadSubject(): void {
    this.loadingService.loading(true);
    this.subjectService.list(new Subject())
      .subscribe(data => {
        this.subjectList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private loadTeacher(): void {
    this.loadingService.loading(true);
    this.teacherService.list(new Teacher())
      .subscribe(data => {
        this.teacherList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private loadClass(): void {
    this.loadingService.loading(true);
    this.classService.list(new Class())
      .subscribe(data => {
        this.classList = <Class[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  private valid() {
    if (!this.classroom.dia || !this.classroom.horaAbertura || !this.classroom.horaFechamento
      || !this.classroom.curso.id || !this.classroom.disciplina.id || !this.classroom.professor.id) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (this.classroom.turmas.length === 0) {
      this.alertService.error(SysMessages.get(16));
      return false;
    }

    return true;
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.loadSubject();
      this.loadTeacher();
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
        this.alertService.error(SysMessages.get(20));
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

  onChangeSubject() {
    this.classroom.professor = new Teacher();
    this.teacherList = [];
    if (this.classroom.disciplina.id) {
      this.loadTeacher();
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
    this.shiftList = Shifts.getAll();
  }

  private loadWeekdays(): void {
    this.weekdaysList = Weekdays.getAll();
  }

  onSubmit() {
    if (this.valid()) {
      this.classroomService.keep(this.classroom)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/classe']);
        },
        error => {
          this.alertService.error(SysMessages.get(20));
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}