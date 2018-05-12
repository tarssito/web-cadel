import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Teacher } from './teacher.model';

@Injectable()
export class TeacherService {
  private url = SERVER_URL + 'teacher/';

  constructor(private http: HttpClient) { }

  list() {
  }

  detail(id: Number) {
    return this.http.get('/api/teacher/' + id);
  }

  keep(teacher: Teacher) {
    return this.http.post('/api/teacher', teacher);
  }

  delete(id: Number) {
    return this.http.delete('/api/teacher/' + id);
  }
}