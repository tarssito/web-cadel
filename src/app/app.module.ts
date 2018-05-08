//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaskModule } from 'soft-angular-mask';

// used to create fake backend - [remove]
import { fakeBackendProvider } from './helpers/fake-backend';

//Authentication
import { AuthGuard } from './guard/auth.guard';

//Root Component
import { AppComponent } from './app.component';

//Alert
import { AlertComponent } from './directives/alert/alert.component';
import { AlertService } from './directives/alert/shared/alert.service';

//Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/shared/login.service';

//Course
import { CourseComponent } from './modules/course/course.component';
import { KeepCourseComponent } from './modules/course/actions/keep/keep-course.component';
import { DetailCourseComponent } from './modules/course/actions/detail/detail-course.component';
import { CourseService } from './modules/course/shared/course.service';
//Student
import { StudentComponent } from './modules/student/student.component';
import { KeepStudentComponent } from './modules/student/actions/keep/keep-student.component';
import { DetailStudentComponent } from './modules/student/actions/detail/detail-student.component';
import { StudentService } from './modules/student/shared/student.service';
//Teacher
import { TeacherComponent } from './modules/teacher/teacher.component';
import { KeepTeacherComponent } from './modules/teacher/actions/keep/keep-teacher.component';
import { DetailTeacherComponent } from './modules/teacher/actions/detail/detail-teacher.component';
import { TeacherService } from './modules/teacher/shared/teacher.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    CourseComponent,
    KeepCourseComponent,
    DetailCourseComponent,
    StudentComponent,
    KeepStudentComponent,
    DetailStudentComponent,
    TeacherComponent,
    KeepTeacherComponent,
    DetailTeacherComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MaskModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    LoginService,
    CourseService,
    StudentService,
    TeacherService,
    fakeBackendProvider //[remove]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }