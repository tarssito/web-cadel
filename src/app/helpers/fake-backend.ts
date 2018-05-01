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
            // array in local storage for registered courses
            let courses: any[] = JSON.parse(localStorage.getItem('courses')) || [];

            // create course VERB=POST
            if (request.url.endsWith('/api/course') && request.method === 'POST') {
                // get new course object from post body
                let newCourse = request.body;

                // validation
                let duplicateUser = courses.filter(_course => { return _course.name === newCourse.name; }).length;
                if (duplicateUser) {
                    return Observable.throw('O curso "' + newCourse.name + '" já foi cadastrado.');
                }

                // save new course
                newCourse.id = courses.length + 1;
                courses.push(newCourse);
                localStorage.setItem('courses', JSON.stringify(courses));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // get course by id VERB=GET[ID]
            if (request.url.match(/\/api\/course\/\d+$/) && request.method === 'GET') {
                // find course by id in courses array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedCourses = courses.filter(course => { return course.id === id; });
                let course = matchedCourses.length ? matchedCourses[0] : null;

                return Observable.of(new HttpResponse({ status: 200, body: course }));
            }
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