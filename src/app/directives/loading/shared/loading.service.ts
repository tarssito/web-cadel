import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    private subject: Subject<any>;

    constructor(private router: Router) {
        this.subject = new Subject<any>();
    }

    loading(isLoading: boolean) {
        this.subject.next();
        if (isLoading) {
            this.subject.next({ loading: isLoading });
            return;
        }
    }

    loaderObservable(): Observable<any> {
        return this.subject.asObservable();
    }

}