import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Subject } from './subject.model';

@Injectable()
export class SubjectService {
  private url = SERVER_URL + 'subject/';

  constructor(private http: HttpClient) { }

  list() {
  }

  detail(id: Number) {
    return this.http.get('/api/subject/' + id);
  }

  keep(subject: Subject) {
    return this.http.post('/api/subject', subject);
  }

  delete(id: Number) {
    return this.http.delete('/api/subject/' + id);
  }
}