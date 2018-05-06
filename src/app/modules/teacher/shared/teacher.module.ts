import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaskModule } from 'soft-angular-mask';

import { TeacherComponent } from './../teacher.component';
import { TeacherService } from './teacher.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    MaskModule
  ],
  declarations: [
    TeacherComponent
  ],
  providers: [
    TeacherService
  ]
})
export class TeacherModule { }
