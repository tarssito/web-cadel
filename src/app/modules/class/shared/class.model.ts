import { Course } from './../../course/shared/course.model';

export class Class {
    id: number;
    sigla: String;
    semestre: number;
    ano: number;
    curso: Course;

    constructor() {
        this.curso = new Course();
    }
} 