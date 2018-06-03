import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from "lodash";
import { SERVER_URL } from './../../../common/api.config';

import { Class } from './class.model';

@Injectable()
export class ClassService {
    private url: string;
    private headers: HttpHeaders;
    private requestOptions: any;

    constructor(private http: HttpClient) {
        this.url = SERVER_URL + 'turmas/';
        this.requestOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        };
    }

    list(filter: Class) {
        let _params = {
            sigla: filter.sigla,
            semestre: filter.semestre,
            ano: filter.ano,
            turno: filter.turnoLetivo,
            idCurso: filter.curso.id,
            idDisciplina: filter.disciplina.id
        };
        if (!_params.sigla) delete _params.sigla;
        if (!_params.semestre) delete _params.semestre;
        if (!_params.ano) delete _params.ano;
        if (!_params.idCurso) delete _params.idCurso;
        if (!_params.turno) delete _params.turno;
        if (!_params.idDisciplina) delete _params.idDisciplina;
        this.requestOptions.params = _params;
        return this.http.get(this.url + 'search', this.requestOptions);
    }

    detail(id: Number) {
        return this.http.get(this.url + id);
    }

    keep(turma: Class) {
        if (turma.id) {
            return this.http.put(this.url, JSON.stringify(turma), this.requestOptions);
        }
        return this.http.post(this.url, JSON.stringify(turma), this.requestOptions);
    }

    delete(id: Number) {
        return this.http.delete(this.url + id);
    }
}