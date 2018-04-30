import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CourseComponent } from './../../../modulos/course/course.component';
import { ManterCursoComponent } from './../../../modulos/course/acoes/manter-curso/manter-curso.component';
import { CourseService } from './course.service';

@NgModule({
  declarations: [
    CourseComponent,
    ManterCursoComponent
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
