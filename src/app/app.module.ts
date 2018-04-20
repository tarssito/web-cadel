import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CursoModule } from './modulos/curso/shared/curso.module';

import { AppComponent } from './app.component';
import { TemplateManterComponent } from './comum/templates/template-manter/template-manter.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateManterComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CursoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
