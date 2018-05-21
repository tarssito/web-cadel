import { Component, OnInit } from '@angular/core';
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

import { Class } from './../../shared/class.model';
import { ClassService } from './../../shared/class.service';

import { Student } from './../../../student/shared/student.model';
import { StudentService } from './../../../student/shared/student.service';
import { SERVER_URL } from './../../../../common/api.config';

@Component({
  selector: 'app-keep-class',
  templateUrl: './keep-class.component.html'
})
export class KeepClassComponent {
  currentYear: number;
  labelBtn: String;
  title: String;
  selectedStudent: any;
  class: Class;
  courseList: Course[];
  subjectList: Subject[];
  studentList: Student[];
  periodList: any[];
  ageList: any[];
  studentSource: string;

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
    private studentService: StudentService
  ) {
    //init
    this.studentSource = SERVER_URL + 'alunos?matricula=:keyword';
    this.currentYear = new Date().getFullYear();
    this.class = new Class();
    this.courseList = [];
    this.subjectList = [];
    this.periodList = [];
    this.ageList = [];
    this.title = "Incluir Turma";
    this.labelBtn = "Incluir";
    // this.successCode = 1;
    this.loadCourses();
    this.loadPeriod();
    this.loadAge();
    // this.detail();
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

  private loadStudent(): void {
    this.loadingService.loading(true);
    this.studentService.list(new Student())
      .subscribe(data => {
        this.studentList = <Student[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  onChangeCourse() {
    this.class.disciplina = new Subject();
    this.subjectList = [];
    if (this.class.curso.id) {
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

  public findStudents() {
    return this.loadStudent;
  }

  public renderStudent(data: any): SafeHtml {
    const html = `<b style='float:left;width:100%'>${data.matricula}</b>
            <span>${data.nome}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
