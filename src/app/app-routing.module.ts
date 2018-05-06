//Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuard
import { AuthGuard } from './guard/auth.guard';
//Login
import { LoginComponent } from './login/login.component';
//Root Component
import { AppComponent } from './app.component';
//Course
import { CourseComponent } from './modules/course/course.component';
import { KeepCourseComponent } from './modules/course/actions/keep/keep-course.component';
import { DetailCourseComponent } from './modules/course/actions/detail/detail-course.component';
//Student
import { StudentComponent } from './modules/student/student.component';
import { KeepStudentComponent } from './modules/student/actions/keep/keep-student.component';
import { DetailStudentComponent } from './modules/student/actions/detail/detail-student.component';
//Teacher
import { TeacherComponent } from './modules/teacher/teacher.component';
import { KeepTeacherComponent } from './modules/teacher/actions/keep/keep-teacher.component';

var _basePathCourse = 'curso';
var _basePathStudent = 'aluno';
var _basePathTeacher = 'professor';
var _basePathLogin = 'login';

var appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
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
        path: _basePathLogin,
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }