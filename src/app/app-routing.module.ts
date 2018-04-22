//Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuard
import { AuthGuard } from './guard/auth.guard';
//Login
import { LoginComponent } from './login/login.component';
//Curso
import { CursoComponent } from './modulos/curso/curso.component';
import { ManterCursoComponent } from './modulos/curso/acoes/manter-curso/manter-curso.component';

var _basePathCurso = 'curso';
var _basePathLogin = 'login';

var appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCurso,
        component: CursoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: _basePathCurso + '/manter',
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