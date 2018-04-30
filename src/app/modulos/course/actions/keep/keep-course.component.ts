import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { CourseService } from './../../shared/course.service';
import { Course } from './../../shared/course.model';


@Component({
  selector: 'app-keep-course',
  templateUrl: './keep-course.component.html'
})
export class KeepCourseComponent implements OnInit {
  title = "Incluir Curso";
  course = new Course();
  labelBtn = "Incluir";

  constructor(
    private location: Location,
    private router: Router,
    private courseService: CourseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.courseService.keep(this.course)
      .subscribe(
      data => {
        this.alertService.success('Inclusão realizada com sucesso', ['/curso']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  voltar() {
    this.location.back();
  }

}
