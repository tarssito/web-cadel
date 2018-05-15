import { Course } from './../../course/shared/course.model';

export class Subject {
    id: number;
    nome: string;
    cargaHoraria: number;
    course: Course = new Course();
}