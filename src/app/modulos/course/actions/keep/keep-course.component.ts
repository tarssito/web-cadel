import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../../../common/mensagens/messages';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { CourseService } from './../../shared/course.service';
import { Course } from './../../shared/course.model';


@Component({
  selector: 'app-keep-course',
  templateUrl: './keep-course.component.html'
})
export class KeepCourseComponent implements OnInit {
  course = new Course();
  title = "Incluir Curso";
  labelBtn = "Incluir";

  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private courseService: CourseService,
    private alertService: AlertService
  ) {
    this.activateRoute.params.subscribe(params => {
      this.courseService.detail(params['id']).subscribe(course => {
        this.course = <Course>course;

        if (this.course.id) {
          this.title = "Alterar Curso";
          this.labelBtn = "Alterar";
        }
      });
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.courseService.keep(this.course)
      .subscribe(
      data => {
        this.alertService.success(SysMessages.get(1), ['/curso']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  voltar() {
    this.location.back();
  }

}
