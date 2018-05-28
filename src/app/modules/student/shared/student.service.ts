import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';
import * as _ from "lodash";
import { Student } from './student.model';

@Injectable()
export class StudentService {
  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'alunos/';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }


  list(filter: Student) {
    let _params = _.clone(filter);
    if (!_params.matricula) delete _params.matricula;
    if (!_params.nome) delete _params.nome;
    this.requestOptions.params = _params;
    return this.http.get(this.url, this.requestOptions);
  }

  detail(id: Number) {
    return this.http.get(this.url + id);
  }

  keep(course: Student) {
    if (course.id) {
      return this.http.put(this.url + course.id, JSON.stringify(course), this.requestOptions);
    }
    return this.http.post(this.url, JSON.stringify(course), this.requestOptions);
  }

  delete(id: Number) {
    return this.http.delete(this.url + id);
  }
}
