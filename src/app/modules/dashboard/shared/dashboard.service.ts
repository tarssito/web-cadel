import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from './../../../common/api.config';
import { Teacher } from './../../teacher/shared/teacher.model';

@Injectable()
export class DashboardService {
  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'classes/dashboard';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }

  list(teacher: Teacher) {
    return this.http.get(this.url + '?idProfessor=' + teacher.id);
  }
}
