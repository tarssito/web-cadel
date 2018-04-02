//Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { CursoComponent } from './modulos/curso/curso.component';

var _basePathCurso = 'curso';

var appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: _basePathCurso,
        component: CursoComponent
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