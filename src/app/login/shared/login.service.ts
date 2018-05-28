import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../common/api.config';

@Injectable()
export class LoginService {
    private url = SERVER_URL + 'professores/auth';

    constructor(private http: Http) { }

    login(model: Object) {
        return this.http.post(this.url, model)
            .map(user => {
                if (user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user.json()));
                }
                return user;
            });
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}