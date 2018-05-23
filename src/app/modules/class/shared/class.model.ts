import { Course } from './../../course/shared/course.model';
import { Subject } from './../../subject/shared/subject.model';
import { Student } from './../../student/shared/student.model';

export class Class {
    id: number;
    sigla: String;
    semestre: number;
    ano: number;
    curso: Course;
    disciplina: Subject;
    turnoLetivo: string;
    alunosTurma: Student[];

    constructor() {
        this.curso = new Course();
        this.disciplina = new Subject();
        this.alunosTurma = [];
    }
} 