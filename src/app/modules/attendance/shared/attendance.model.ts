import { Class } from './../../class/shared/class.model';
import { Student } from './../../student/shared/student.model';

export class Attendance {
    id: number;
    data: Date;
    horaAbertura: DateTimeFormat;
    horaFechamento: DateTimeFormat;
    classe: Class;
    alunos: any[];
    registro: string;

    constructor() {
        this.classe = new Class();
        this.alunos = [];
    }
}