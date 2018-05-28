import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from './../directives/alert/shared/alert.service';
import { LoadingService } from './../directives/loading/shared/loading.service';
import { LoginService } from './shared/login.service';
import { SysMessages } from './../common/mensagens/messages';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any;
    returnUrl: string;
    invalid: boolean;
    message: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService,
        private loadingService: LoadingService
    ) {
        this.model = {};
        this.invalid = false;
        this.message = null;
    }

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.message = null;
        this.loadingService.loading(true);
        this.loginService.login(this.model)
            .subscribe(
            data => {
                window.location.href = '/';
                this.loadingService.loading(false);
            },
            error => {
                this.invalid = true;
                if (error.status != 404) {
                    this.message = SysMessages.get(20);
                } else {
                    this.message = SysMessages.get(19);
                }
                this.loadingService.loading(false);
            });
    }
}