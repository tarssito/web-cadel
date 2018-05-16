import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Course } from './course.model';

@Injectable()
export class CourseService {
    private url: string;
    private headers: HttpHeaders;
    private requestOptions: any;

    constructor(private http: HttpClient) {
        this.url = SERVER_URL + 'cursos/';
        this.requestOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'})
        };
    }

    list(filter: Course) {
        return this.http.get(this.url);
    }

    detail(id: Number) {
        return this.http.get(this.url + id);
    }

    keep(course: Course) {
        if (course.id) {
            return this.http.put(this.url + course.id, JSON.stringify(course), this.requestOptions);
        }
        return this.http.post(this.url, JSON.stringify(course), this.requestOptions);
    }

    delete(id: Number) {
        return this.http.delete(this.url + id);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}