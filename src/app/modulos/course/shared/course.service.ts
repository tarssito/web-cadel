import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

@Injectable()
export class CourseService {
    private url = SERVER_URL + 'course';

    constructor(private http: Http) { }
}