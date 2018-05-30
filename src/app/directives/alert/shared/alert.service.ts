import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.subject.next();
            }
        });
    }

    success(message: string, redirectUrl, timeToRedirect: Number = 1000) {
        this.subject.next({ type: 'success', text: message });
        setTimeout(() => {
            this.router.navigate(redirectUrl);
        }, timeToRedirect);
    }

    successNoRedirect(message: string, timeToClearMsg: Number = 1000) {
        this.subject.next({ type: 'success', text: message });
        setTimeout(() => {
            this.subject.next();
        }, timeToClearMsg);
    }

    error(message: string) {
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}