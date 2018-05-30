import { Class } from './../../class/shared/class.model';
import { Student } from './../../student/shared/student.model';

export class Attendance {
    data: Date;
    horaAbertura: DateTimeFormat;
    horaFechamento: DateTimeFormat;
    classe: Class;
    alunos: any[];

    constructor() {
        this.classe = new Class();
        this.alunos = [];
    }
}