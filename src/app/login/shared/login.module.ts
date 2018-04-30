//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaskModule } from 'soft-angular-mask';

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
        BrowserModule,
        FormsModule,
        MaskModule
    ],
    providers: [
        LoginService,
        AlertService
    ]
})
export class LoginModule { }
