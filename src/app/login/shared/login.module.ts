import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Services
import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoginService } from './../../login/shared/login.service';

//Authentication
import { AuthGuard } from './../../guard/auth.guard';

//Components
import { LoginComponent } from './../login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        LoginService,
        AlertService
    ]
})
export class LoginModule { }
