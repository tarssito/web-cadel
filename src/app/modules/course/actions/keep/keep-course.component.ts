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
export class KeepCourseComponent {
    course: Course;
    title: String;
    labelBtn: String;
    successCode: Number;

    constructor(
        private location: Location,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private courseService: CourseService,
        private alertService: AlertService
    ) {
        //init
        this.course = new Course();
        this.title = "Incluir Aluno";
        this.labelBtn = "Incluir";
        this.successCode = 1;
        this.detail();
    }

    private detail() {
        var _id = this.activateRoute.snapshot.params['id'];
        if (_id) {
            this.title = "Alterar Curso";
            this.labelBtn = "Alterar";
            this.successCode = 2;

            this.courseService.detail(_id).subscribe(course => {
                this.course = <Course>course;
                if (!this.course) {
                    this.router.navigate(['/curso']);
                }
            }, error => {
                this.alertService.error(error);
            });
        }
    }

    private valid() {
        if (!this.course.nome) {
            this.alertService.error(SysMessages.get(4));
            return false;
        }
        return true;
    }

    onSubmit() {
        if (this.valid()) {
            this.courseService.keep(this.course)
                .subscribe(
                data => {
                    this.alertService.success(SysMessages.get(this.successCode), ['/curso']);
                },
                error => {
                    this.alertService.error(error);
                });
        } else {
            this.alertService.error(SysMessages.get(4));
        }
    }

    goBack() {
        this.location.back();
    }

}