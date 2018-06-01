import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Shifts } from './../../../../common/shift/shift';

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
  courseList: any;
  subjectList: any;
  periodList: any[];
  ageList: any[];
  shiftList: any[];
  studentSource: string;
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
    private studentService: StudentService
  ) {
    //init
    this.studentSource = SERVER_URL + 'turmas/alunos?matricula=:keyword';
    this.currentYear = new Date().getFullYear();
    this.class = new Class();
    this.courseList = [];
    this.subjectList = [];
    this.subjectList = [];
    this.periodList = [];
    this.ageList = [];
    this.shiftList = [];
    this.title = "Incluir Turma";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.loadCourses();
    this.loadPeriod();
    this.loadAge();
    this.loadShift();
    this.detail();
  }

  private valid() {
    if (!this.class.sigla || !this.class.semestre || !this.class.ano
      || !this.class.curso.id || !this.class.disciplina.id || !this.class.turnoLetivo) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (this.class.sigla.length < 5) {
      this.alertService.error(SysMessages.get(17));
      return false;
    }

    if (this.class.alunos.length === 0) {
      this.alertService.error(SysMessages.get(12));
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.valid()) {
      this.classService.keep(this.class)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/turma']);
        },
        error => {
          console.log(error);
        });
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.loadSubject();
      this.title = "Alterar Turma";
      this.labelBtn = "Alterar";
      this.successCode = 2;

      this.loadingService.loading(true);
      this.classService.detail(_id).subscribe(_class => {
        this.class = <Class>_class;
        this.loadingService.loading(false);
        if (!this.class) {
          this.router.navigate(['/turma']);
        }
      }, error => {
        this.alertService.error(error);
      });
    }
  }

  private loadCourses(): void {
    this.loadingService.loading(true);
    this.courseService.list(new Course())
      .subscribe(data => {
        this.courseList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  private loadSubject(): void {
    this.loadingService.loading(true);
    this.subjectService.list(new Subject())
      .subscribe(data => {
        this.subjectList = data;
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

  linkStudent() {
    let exists = this.class.alunos.find((_student) => { return _student.id === this.selectedStudent.id });
    if (exists) {
      this.alertService.error(SysMessages.get(13));
      return;
    }
    this.class.alunos.push(this.selectedStudent);
    this.selectedStudent = null;
  }

  unlinkStudent(id: number): void {
    let _index = this.class.alunos.findIndex(student => { return student.id === id });
    this.class.alunos.splice(_index, 1);
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

  goBack() {
    this.location.back();
  }

}