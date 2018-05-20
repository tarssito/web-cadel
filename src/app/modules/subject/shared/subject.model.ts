import { Course } from './../../course/shared/course.model';

export class Subject {
    id: number;
    nome: string;
    cargaHoraria: number;
    curso: Course;
    cursos: Course[];

    constructor() {
        this.curso = new Course();
        this.cursos = [];
    }
}