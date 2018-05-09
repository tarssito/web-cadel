import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
    private subject = new Subject<any>();

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.subject.next();
            }
        });
    }

    openModal() {
        this.subject.next({ modal: true });
    }

    getModal(): Observable<any> {
        return this.subject.asObservable();
    }
}