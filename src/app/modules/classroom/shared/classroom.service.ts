import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SERVER_URL } from './../../../common/api.config';
import { Classroom } from './classroom.model';

@Injectable()
export class ClassroomService {
  private url: string;
  private headers: HttpHeaders;
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.url = SERVER_URL + 'classes/';
    this.requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
  }

  list(filter: Classroom) {
    let _params = {
      dia: filter.diaSemana,
      semestre: filter.semestre,
      ano: filter.ano,
      idCurso: filter.curso.id
    };
    if (!_params.dia) delete _params.dia;
    if (!_params.semestre) delete _params.semestre;
    if (!_params.ano) delete _params.ano;
    if (!_params.idCurso) delete _params.idCurso;
    this.requestOptions.params = _params;
    return this.http.get(this.url + 'search', this.requestOptions);
  }

  detail(id: Number) {
    return this.http.get(this.url + id);
  }

  keep(classroom: Classroom) {
    if (classroom.id) {
      return this.http.put(this.url, JSON.stringify(classroom), this.requestOptions);
    }
    return this.http.post(this.url, JSON.stringify(classroom), this.requestOptions);
  }

  delete(id: Number) {
    return this.http.delete(this.url + id);
  }
}
