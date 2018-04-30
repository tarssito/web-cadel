//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Modules
import { CourseModule } from './modulos/course/shared/course.module';
import { LoginModule } from './login/shared/login.module';

import { AlertComponent } from './directives/alert/alert.component';
// used to create fake backend - remove
import { fakeBackendProvider } from './helpers/fake-backend';

//Authentication
import { AuthGuard } from './guard/auth.guard';

//Root Component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CourseModule,
    HttpModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    AuthGuard,
    fakeBackendProvider //remove
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
