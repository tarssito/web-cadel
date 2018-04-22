import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../../app-routing.module';
import { FormsModule } from '@angular/forms';

import { CursoComponent } from './../../../modulos/curso/curso.component';
import { ManterCursoComponent } from './../../../modulos/curso/acoes/manter-curso/manter-curso.component';

@NgModule({
  declarations: [
    CursoComponent,
    ManterCursoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: []
})
export class CursoModule { }
