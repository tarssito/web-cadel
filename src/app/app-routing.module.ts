//Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuard
import { AuthGuard } from './guard/auth.guard';
//Login
import { LoginComponent } from './login/login.component';
//Course
import { CourseComponent } from './modulos/course/course.component';
import { ManterCursoComponent } from './modulos/course/acoes/manter-curso/manter-curso.component';

var _basePathCourse = 'curso';
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
        component: ManterCursoComponent,
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