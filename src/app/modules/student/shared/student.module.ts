import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaskModule } from 'soft-angular-mask';

import { StudentComponent } from './../student.component';
import { KeepStudentComponent } from './../actions/keep/keep-student.component';
import { StudentService } from './student.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    MaskModule
  ],
  declarations: [
    StudentComponent,
    KeepStudentComponent
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
