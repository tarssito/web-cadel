import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';
import { Attendance } from './attendance.model';

@Injectable()
export class AttendanceService {
  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'aulas/';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }

  open(attendance: Attendance) {
    return this.http.post(this.url, JSON.stringify(attendance), this.requestOptions);
  }

  close(attendance: Attendance) {
    return this.http.put(this.url, JSON.stringify(attendance), this.requestOptions);
  }
}
