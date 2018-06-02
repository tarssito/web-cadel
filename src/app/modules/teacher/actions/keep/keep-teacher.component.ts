import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';
import { Utils } from './../../../../helpers/utils/utils';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { Course } from './../../../course/shared/course.model';
import { CourseService } from './../../../course/shared/course.service';
import { TeacherService } from './../../shared/teacher.service';
import { Teacher } from './../../shared/teacher.model';
import { Subject } from './../../../subject/shared/subject.model';
import { SubjectService } from './../../../subject/shared/subject.service';

@Component({
  selector: 'app-keep-teacher',
  templateUrl: './keep-teacher.component.html'
})
export class KeepTeacherComponent {
  teacher: Teacher;
  genderList: any[];
  courseList: any;
  subjectList: any;
  title: String;
  labelBtn: String;
  successCode: Number;

  //dependency injection
  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private courseService: CourseService,
    private subjectService: SubjectService
  ) {
    //init
    this.teacher = new Teacher();
    this.title = "Incluir Professor";
    this.labelBtn = "Incluir";
    this.successCode = 1;
    this.courseList = [];
    this.subjectList = [];
    this.loadCourses();
    this.loadGenderList();
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
    let _filter = new Course();
    _filter.id = this.teacher.curso.id;
    this.subjectService.findByCourse(_filter)
      .subscribe(data => {
        this.subjectList = data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  onChangeCourse() {
    this.subjectList = [];
    this.teacher.disciplinas = [];
    if (this.teacher.curso.id) {
      this.loadSubject();
    }
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    if (_id) {
      this.loadSubject();
      this.title = "Alterar Professor";
      this.labelBtn = "Alterar";
      this.successCode = 2;

      this.loadingService.loading(true);
      this.teacherService.detail(_id).subscribe(teacher => {
        this.teacher = <Teacher>teacher;
        this.loadingService.loading(false);
        if (!this.teacher) {
          this.router.navigate(['/professor']);
        }
      }, error => {
        this.alertService.error(SysMessages.get(20));
      });
    }
  }

  private valid() {
    if (!this.teacher.nome || !this.teacher.matricula || !this.teacher.cpf || !this.teacher.email || !this.teacher.sexo) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }

    if (Number(this.teacher.matricula) == 0) {
      this.alertService.error(SysMessages.get(9));
      return false;
    }

    if (!Utils.validateCpf(this.teacher.cpf)) {
      this.alertService.error(SysMessages.get(6));
      return false;
    }

    if (!Utils.validateEmail(this.teacher.email)) {
      this.alertService.error(SysMessages.get(5));
      return false;
    }

    if (this.teacher.disciplinas.length === 0) {
      this.alertService.error(SysMessages.get(15));
      return false;
    }

    return true;
  }

  private loadGenderList() {
    this.genderList = [];
    this.genderList.push({
      id: 'M',
      description: 'Masculino'
    });
    this.genderList.push({
      id: 'F',
      description: 'Feminino'
    });
  }

  onSubmit() {
    if (this.valid()) {
      this.teacherService.keep(this.teacher)
        .subscribe(
        data => {
          this.alertService.success(SysMessages.get(this.successCode), ['/professor']);
        },
        error => {
          this.alertService.error(SysMessages.get(20));
        });
    }
  }

  goBack() {
    this.location.back();
  }
}