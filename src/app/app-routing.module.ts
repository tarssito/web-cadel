//Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuard
import { AuthGuard } from './guard/auth.guard';
//Login
import { LoginComponent } from './login/login.component';
//Root Component
import { AppComponent } from './app.component';
//Attendance
import { AttendanceComponent } from './modules/attendance/attendance.component';
//Class
import { ClassComponent } from './modules/class/class.component';
import { KeepClassComponent } from './modules/class/actions/keep/keep-class.component';
import { DetailClassComponent } from './modules/class/actions/detail/detail-class.component';
//Classroom
import { ClassroomComponent } from './modules/classroom/classroom.component';
import { KeepClassroomComponent } from './modules/classroom/actions/keep/keep-classroom.component';
import { DetailClassroomComponent } from './modules/classroom/actions/detail/detail-classroom.component';
//Course
import { CourseComponent } from './modules/course/course.component';
import { KeepCourseComponent } from './modules/course/actions/keep/keep-course.component';
import { DetailCourseComponent } from './modules/course/actions/detail/detail-course.component';
//Dashboard
import { DashboardComponent } from './modules/dashboard/dashboard.component';
//Student
import { StudentComponent } from './modules/student/student.component';
import { KeepStudentComponent } from './modules/student/actions/keep/keep-student.component';
import { DetailStudentComponent } from './modules/student/actions/detail/detail-student.component';
//Subject
import { SubjectComponent } from './modules/subject/subject.component';
import { KeepSubjectComponent } from './modules/subject/actions/keep/keep-subject.component';
import { DetailSubjectComponent } from './modules/subject/actions/detail/detail-subject.component';
//Teacher
import { TeacherComponent } from './modules/teacher/teacher.component';
import { KeepTeacherComponent } from './modules/teacher/actions/keep/keep-teacher.component';
import { DetailTeacherComponent } from './modules/teacher/actions/detail/detail-teacher.component';

var _basePathAttendance = 'chamada';
var _basePathCourse = 'curso';
var _basePathStudent = 'aluno';
var _basePathSubject = 'disciplina';
var _basePathTeacher = 'professor';
var _basePathClass = 'turma';
var _basePathClassroom = 'classe';
var _basePathLogin = 'login';

var appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCourse,
        component: CourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCourse + '/manter',
        component: KeepCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCourse + '/manter/:id',
        component: KeepCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCourse + '/detalhes/:id',
        component: DetailCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCourse + '/excluir/:id',
        component: DetailCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathStudent,
        component: StudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathStudent + '/manter',
        component: KeepStudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathStudent + '/manter/:id',
        component: KeepStudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathStudent + '/detalhes/:id',
        component: DetailStudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathStudent + '/excluir/:id',
        component: DetailStudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathTeacher,
        component: TeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathTeacher + '/manter',
        component: KeepTeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathTeacher + '/manter/:id',
        component: KeepTeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathTeacher + '/detalhes/:id',
        component: DetailTeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathTeacher + '/excluir/:id',
        component: DetailTeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathAttendance,
        component: AttendanceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathSubject,
        component: SubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathSubject + '/manter',
        component: KeepSubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathSubject + '/manter/:id',
        component: KeepSubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathSubject + '/detalhes/:id',
        component: DetailSubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathSubject + '/excluir/:id',
        component: DetailSubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClass,
        component: ClassComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClass + '/manter',
        component: KeepClassComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClass + '/manter/:id',
        component: KeepClassComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClass + '/detalhes/:id',
        component: DetailClassComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClass + '/excluir/:id',
        component: DetailClassComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClassroom,
        component: ClassroomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClassroom + '/manter',
        component: KeepClassroomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClassroom + '/manter/:id',
        component: KeepClassroomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClassroom + '/detalhes/:id',
        component: DetailClassroomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathClassroom + '/excluir/:id',
        component: DetailClassroomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathLogin,
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } //debug: true or false
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }