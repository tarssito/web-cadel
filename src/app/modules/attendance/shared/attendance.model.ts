import { Class } from './../../class/shared/class.model';
import { Student } from './../../student/shared/student.model';

export class Attendance {
    data: Date;
    horaAbertura: DateTimeFormat;
    horaFechamento: DateTimeFormat;
    class: Class;
    students: any;

    constructor() {
        this.class = new Class();
        this.students = [];
    }
}