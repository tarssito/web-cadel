import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Course } from './course.model';

@Injectable()
export class CourseService {
    private url = SERVER_URL + 'course';

    constructor(private http: HttpClient) { }

    list() {
    }

    details(id: Number) {
    }

    keep(course: Course) {
        return this.http.post('/api/course', course);
    }

    delete(id: Number) {
    }
}