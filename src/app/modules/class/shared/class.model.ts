import { Course } from './../../course/shared/course.model';
import { Subject } from './../../subject/shared/subject.model';

export class Class {
    id: number;
    sigla: String;
    semestre: number;
    ano: number;
    curso: Course;
    disciplina: Subject;

    constructor() {
        this.curso = new Course();
        this.disciplina = new Subject();
    }
} 