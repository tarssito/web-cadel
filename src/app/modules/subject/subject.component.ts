import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Subject } from './shared/subject.model';
import { Course } from './../course/shared/course.model';
import { SubjectService } from './shared/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent {
  filter: Subject;
  subjectList: Subject[];
  courseList: Course[];

  //dependency injection
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    this.filter = new Subject();
    this.subjectList = [];
    this.courseList = [];
    this.loadCourses();
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.subjectList = JSON.parse(localStorage.getItem('disciplinas')) || [];
    this.subjectList.forEach((item) => { item.curso = new Course(); item.curso.nome = 'Curso 1'; });
    this.loadingService.loading(false);
  }

  private loadCourses(): void {
    for(let i = 0; i < 10; i++) {
      let _course = new Course();
      _course.id = i + 1;
      _course.nome = 'Curso ' + _course.id;
      this.courseList.push(_course);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
