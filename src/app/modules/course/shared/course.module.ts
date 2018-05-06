import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CourseComponent } from './../../../modules/course/course.component';
import { KeepCourseComponent } from './../../../modules/course/actions/keep/keep-course.component';
import { DetailCourseComponent } from './../../../modules/course/actions/detail/detail-course.component';
import { CourseService } from './course.service';

@NgModule({
    declarations: [
        CourseComponent,
        KeepCourseComponent,
        DetailCourseComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        CourseService
    ]
})
export class CourseModule { }
