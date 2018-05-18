import { Course } from './../../course/shared/course.model';

export class Subject {
    id: number;
    nome: string;
    cargaHoraria: number;
    curso: Course = new Course();
}