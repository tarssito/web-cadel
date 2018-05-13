import { Teacher } from './../../teacher/shared/teacher.model';

export class Attendance {
    data: Date;
    horaAbertura: DateTimeFormat;
    horaFechamento: DateTimeFormat;
    professor: Teacher;
    // disciplina: Subject;
}