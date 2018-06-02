import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET } from '@angular/router';

import { SysMessages } from './../../../../common/mensagens/messages';
import { CourseService } from './../../shared/course.service';
import { AlertService } from './../../../../directives/alert/shared/alert.service';
import { LoadingService } from './../../../../directives/loading/shared/loading.service';
import { Course } from './../../shared/course.model';

@Component({
    selector: 'app-detail-course',
    templateUrl: './detail-course.component.html'
})
export class DetailCourseComponent {
    course: Course;
    title: String;
    excluir: Boolean;

    //dependency injection
    constructor(
        private location: Location,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private courseService: CourseService,
        private alertService: AlertService,
        private loadingService: LoadingService
    ) {
        //init
        this.course = new Course();
        this.title = "Detalhes do Curso";
        this.excluir = false;
        this.checkAction();
        this.detail();
    }

    /* Check if action is to delete or detail */
    private checkAction() {
        var tree: UrlTree = this.router.parseUrl(this.router.url);
        var urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        var urlSegment: UrlSegment[] = urlSegmentGroup.segments;

        if (urlSegment.find(_urlSegment => _urlSegment.path === 'excluir')) {
            this.title = "Excluir Curso";
            this.excluir = true;
        }
    }

    private detail() {
        var _id = this.activateRoute.snapshot.params['id'];
        this.loadingService.loading(true);
        this.courseService.detail(_id).subscribe(course => {
            this.course = <Course>course;
            this.loadingService.loading(false);
        }, err => {
            this.alertService.error(err);
        });
    }

    delete() {
        this.courseService.delete(this.course.id)
            .subscribe(
            data => {
                this.alertService.success(SysMessages.get(3), ['/curso']);
            },
            error => {
                this.alertService.error(SysMessages.get(20));
            });
    }

    goBack() {
        this.location.back();
    }
}