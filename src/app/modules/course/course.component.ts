import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Course } from './shared/course.model';
import { CourseService } from './shared/course.service';
import { PAGINATION } from './../../common/pagination.config';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
})
export class CourseComponent {
    filter: Course;
    courseList: any;
    PAGINATION: any;

    //dependency injection
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private alertService: AlertService,
        private loadingService: LoadingService
    ) {
        this.PAGINATION = PAGINATION;
        this.filter = new Course();
        this.courseList = [];
        this.search();
    }

    search(): void {
        this.loadingService.loading(true);
        this.courseService.list(this.filter)
            .subscribe(data => {
                this.courseList = data;
                this.loadingService.loading(false);
            }, error => {
                this.alertService.error(SysMessages.get(20));
            });
    }

    goBack(): void {
        this.location.back();
    }

}