import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Student } from './student.model';

@Injectable()
export class StudentService {
  private url = SERVER_URL + 'student/';

  constructor(private http: HttpClient) { }

  list() {
  }

  detail(id: Number) {
    return this.http.get('/api/student/' + id);
  }

  keep(student: Student) {
    return this.http.post('/api/student', student);
  }

  delete(id: Number) {
    return this.http.delete('/api/student/' + id);
  }
}
