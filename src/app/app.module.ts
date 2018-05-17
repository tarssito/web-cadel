//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaskModule } from 'soft-angular-mask';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

// used to create fake backend - [remove]
import { fakeBackendProvider } from './helpers/fake-backend';

//DualList
import { AngularDualListBoxModule } from 'angular-dual-listbox';

//Authentication
import { AuthGuard } from './guard/auth.guard';

//Root Component
import { AppComponent } from './app.component';

//Alert
import { AlertComponent } from './directives/alert/alert.component';
import { AlertService } from './directives/alert/shared/alert.service';

//Modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './directives/modal/modal.component';

//Loading
import { LoadingComponent } from './directives/loading/loading.component';
import { LoadingService } from './directives/loading/shared/loading.service';

//Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/shared/login.service';

//Attendance
import { AttendanceComponent } from './modules/attendance/attendance.component';
//Class
import { ClassComponent } from './modules/class/class.component';
import { KeepClassComponent } from './modules/class/actions/keep/keep-class.component';
//Classroom
import { ClassroomComponent } from './modules/classroom/classroom.component';
import { KeepClassroomComponent } from './modules/classroom/actions/keep/keep-classroom.component';
//Course
import { CourseComponent } from './modules/course/course.component';
import { KeepCourseComponent } from './modules/course/actions/keep/keep-course.component';
import { DetailCourseComponent } from './modules/course/actions/detail/detail-course.component';
import { CourseService } from './modules/course/shared/course.service';
//Dashboard
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardService } from './modules/dashboard/shared/dashboard.service';
//Student
import { StudentComponent } from './modules/student/student.component';
import { KeepStudentComponent } from './modules/student/actions/keep/keep-student.component';
import { DetailStudentComponent } from './modules/student/actions/detail/detail-student.component';
import { StudentService } from './modules/student/shared/student.service';
//Subject
import { SubjectComponent } from './modules/subject/subject.component';
import { KeepSubjectComponent } from './modules/subject/actions/keep/keep-subject.component';
import { DetailSubjectComponent } from './modules/subject/actions/detail/detail-subject.component';
import { SubjectService } from './modules/subject/shared/subject.service';
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
    LoadingComponent,
    ModalComponent,
    CourseComponent,
    KeepCourseComponent,
    DetailCourseComponent,
    StudentComponent,
    KeepStudentComponent,
    DetailStudentComponent,
    TeacherComponent,
    KeepTeacherComponent,
    DetailTeacherComponent,
    AttendanceComponent,
    SubjectComponent,
    KeepSubjectComponent,
    DetailSubjectComponent,
    DashboardComponent,
    ClassComponent,
    KeepClassComponent,
    ClassroomComponent,
    KeepClassroomComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MaskModule,
    AngularDualListBoxModule,
    Ng2AutoCompleteModule
  ],
  providers: [
    NgbActiveModal,
    AuthGuard,
    AlertService,
    LoadingService,
    LoginService,
    CourseService,
    StudentService,
    TeacherService,
    SubjectService,
    DashboardService,
    fakeBackendProvider //[remove]
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }