import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';

import { Subject } from './subject.model';

@Injectable()
export class SubjectService {
  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'disciplinas/';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }

  list(filter: Subject) {
    return this.http.get(this.url);
  }

  detail(id: Number) {
    return this.http.get(this.url + id);
  }

  keep(subject: Subject) {
    if (subject.id) {
      return this.http.put(this.url + subject.id, JSON.stringify(subject), this.requestOptions);
    }
    return this.http.post(this.url, JSON.stringify(subject), this.requestOptions);
  }

  delete(id: Number) {
    return this.http.delete(this.url + id);
  }
}