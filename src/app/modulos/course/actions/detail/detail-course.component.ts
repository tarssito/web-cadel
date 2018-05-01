import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './../../shared/course.service';
import { Course } from './../../shared/course.model';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html'
})
export class DetailCourseComponent implements OnInit {
  course = new Course();

  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.courseService.detail(params['id']).subscribe(course => {
        this.course = <Course>course;
      });
    });
  }

  voltar() {
    this.location.back();
  }
}
