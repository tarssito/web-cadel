import { Subject } from './../../subject/shared/subject.model';
import { Course } from './../../course/shared/course.model';

export class Teacher {
    id: number;
    matricula: string;
    nome: string;
    senha: string;
    cpf: number;
    email: string;
    sexo: string;
    curso: Course;
    disciplinas: Subject[];

    constructor() {
        this.curso = new Course();
        this.disciplinas = [];
    }
}