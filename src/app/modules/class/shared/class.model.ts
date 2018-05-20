import { Course } from './../../course/shared/course.model';

export class Class {
    id: number;
    sigla: String;
    semestre: String;
    ano: String;
    curso: Course = new Course();
} 