import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Teacher } from './teacher.model';

@Injectable()
export class TeacherService {

  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'professores/';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }

  list(filter: Teacher) {
    return this.http.get(this.url);
  }

  detail(id: Number) {
    return this.http.get(this.url + id);
  }

  keep(teacher: Teacher) {
    if (teacher.id) {
      return this.http.put(this.url + teacher.id, JSON.stringify(teacher), this.requestOptions);
    }
    return this.http.post(this.url, JSON.stringify(teacher), this.requestOptions);
  }

  delete(id: Number) {
    return this.http.delete(this.url + id);
  }
}