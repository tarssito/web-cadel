import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';
import { CourseService } from './../../../course/shared/course.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { SubjectService } from './../../shared/subject.service';
import { Subject } from './../../shared/subject.model';
import { Course } from './../../../course/shared/course.model';

@Component({
  selector: 'app-keep-subject',
  templateUrl: './keep-subject.component.html'
})
export class KeepSubjectComponent {
  subject: Subject;
  title: String;
  labelBtn: String;
  courseList: Course[];
  successCode: Number;

  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService
  ) {
    //init
    this.subject = new Subject();
    this.courseList = [];
    this.loadCourses();
    this.title = "Incluir Disciplina";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.detail();
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.title = "Alterar Disciplina";
      this.labelBtn = "Alterar";
      this.successCode = 2;
      this.loadingService.loading(true);
      this.subjectService.detail(_id).subscribe(subject => {
        this.subject = <Subject>subject;
        this.subject.curso.id = 1;
        this.subject.curso.nome = 'Curso MOCK';
        this.loadingService.loading(false);
        if (!this.subject) {
          this.router.navigate(['/disciplina']);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  private valid() {
    if (!this.subject.nome || !this.subject.cargaHoraria || !this.subject.curso.id) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (this.subject.cargaHoraria == 0) {
      this.alertService.error(SysMessages.get(10));
      return false;
    }

    return true;
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

  onSubmit() {
    if (this.valid()) {
      this.subjectService.keep(this.subject)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/disciplina']);
        },
        error => {
          console.log(error);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}