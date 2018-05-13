import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
            // ########################## STUDENT ##########################
            let students: any[] = JSON.parse(localStorage.getItem('students')) || [];

            // create student VERB=POST
            if (request.url.endsWith('/api/student') && request.method === 'POST') {
                let newStudent = request.body;

                newStudent.id = students.length + 1;
                students.push(newStudent);
                localStorage.setItem('students', JSON.stringify(students));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // get student by id VERB=GET[ID]
            if (request.url.match(/\/api\/student\/\d+$/) && request.method === 'GET') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedStudents = students.filter(std => { return std.id === id; });
                let student = matchedStudents.length ? matchedStudents[0] : null;

                return Observable.of(new HttpResponse({ status: 200, body: student }));
            }

            if (request.url.match(/\/api\/student\/\d+$/) && request.method === 'DELETE') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < students.length; i++) {
                    let student = students[i];
                    if (student.id === id) {
                        // delete student
                        students.splice(i, 1);
                        localStorage.setItem('students', JSON.stringify(students));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // ########################## TEACHER ##########################
            let teachers: any[] = JSON.parse(localStorage.getItem('professores')) || [];

            // create teacher VERB=POST
            if (request.url.endsWith('/api/teacher') && request.method === 'POST') {
                let newTeacher = request.body;

                newTeacher.id = teachers.length + 1;
                teachers.push(newTeacher);
                localStorage.setItem('professores', JSON.stringify(teachers));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // get teacher by id VERB=GET[ID]
            if (request.url.match(/\/api\/teacher\/\d+$/) && request.method === 'GET') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedTeachers = teachers.filter(std => { return std.id === id; });
                let student = matchedTeachers.length ? matchedTeachers[0] : null;

                return Observable.of(new HttpResponse({ status: 200, body: student }));
            }

            if (request.url.match(/\/api\/teacher\/\d+$/) && request.method === 'DELETE') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < teachers.length; i++) {
                    let student = teachers[i];
                    if (student.id === id) {
                        // delete student
                        teachers.splice(i, 1);
                        localStorage.setItem('professores', JSON.stringify(teachers));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // ########################## SUBJECT ##########################
            let subjects: any[] = JSON.parse(localStorage.getItem('disciplinas')) || [];

            // create subject VERB=POST
            if (request.url.endsWith('/api/subject') && request.method === 'POST') {
                let newSubject = request.body;

                newSubject.id = subjects.length + 1;
                subjects.push(newSubject);
                localStorage.setItem('disciplinas', JSON.stringify(subjects));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // get subject by id VERB=GET[ID]
            if (request.url.match(/\/api\/subject\/\d+$/) && request.method === 'GET') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedSubject = subjects.filter(std => { return std.id === id; });
                let student = matchedSubject.length ? matchedSubject[0] : null;

                return Observable.of(new HttpResponse({ status: 200, body: student }));
            }

            if (request.url.match(/\/api\/subject\/\d+$/) && request.method === 'DELETE') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < subjects.length; i++) {
                    let student = subjects[i];
                    if (student.id === id) {
                        subjects.splice(i, 1);
                        localStorage.setItem('disciplinas', JSON.stringify(subjects));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }


            // pass through any requests not handled above
            return next.handle(request);
        })

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(500)
            .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};