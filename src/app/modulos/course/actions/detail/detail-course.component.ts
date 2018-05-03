import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { CourseService } from './../../shared/course.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { Course } from './../../shared/course.model';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html'
})
export class DetailCourseComponent implements OnInit {
  course = new Course();
  title = "Detalhes do Curso";
  excluir = false;

  constructor(
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private courseService: CourseService,
    private alertService: AlertService
  ) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const urlSegment: UrlSegment[] = urlSegmentGroup.segments;

    if(!!urlSegment.find(_urlSegment => _urlSegment.path === 'excluir')) {
      this.title = "Excluir Curso";
      this.excluir = true;
    }
    this.activateRoute.params.subscribe(params => {
      this.courseService.detail(params['id']).subscribe(course => {
        this.course = <Course>course;
      });
    });
  }

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
