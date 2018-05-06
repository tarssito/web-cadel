import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from './shared/course.model';
import { CourseService } from './shared/course.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
    filter: Course = new Course();
    courseList: Course[] = [];

    //dependency injection
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit() {
    }

    search(): void {
        this.courseList = JSON.parse(localStorage.getItem('courses')) || [];
    }

    goBack(): void {
        this.location.back();
    }

}