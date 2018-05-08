import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from './../directives/alert/shared/alert.service';
import { LoginService } from './shared/login.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        window.location.href = this.returnUrl;
        // this.loginService.login(this.model.username, this.model.password)
        //     .subscribe(
        //     data => {
        //         this.router.navigate([this.returnUrl]);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //         this.loading = false;
        //     });
        this.loginService.login(this.model.username, this.model.password);
    }
}