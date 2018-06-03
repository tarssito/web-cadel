import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../common/mensagens/messages';
import { States } from './../../common/states/states';
import { LoadingService } from './../../directives/loading/shared/loading.service';
import { Classroom } from './../classroom/shared/classroom.model';
import { ClassroomService } from './../classroom/shared/classroom.service';
import { AlertService } from './../../directives/alert/shared/alert.service';
import { Attendance } from './shared/attendance.model';
import { AttendanceService } from './shared/attendance.service';
import { Shifts } from '../../common/shift/shift';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent {
  title: string;
  state: any;
  attendance: Attendance;
  currentUser: any;
  classroom: Classroom;
  studentList: any;
  actRegister: boolean;

  constructor(
    private alertService: AlertService,
    private classroomService: ClassroomService,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private attendanceService: AttendanceService
  ) {
    this.state = States.get('P');
    this.title = 'Efetuar Chamada';
    this.actRegister = false;
    this.attendance = new Attendance();
    this.studentList = [];
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.detail();
  }

  private detail() {
    var _id = this.activateRoute.snapshot.params['id'];
    this.loadingService.loading(true);
    this.classroomService.detail(_id).subscribe(_class => {
      this.classroom = <Classroom>_class;
      this.formatShiftDescription(this.classroom.turno);
      this.loadStudentList(this.classroom.turmas);
      this.loadingService.loading(false);
    }, err => {
      this.alertService.error(err);
    });
  }

  private formatShiftDescription(id: string) {
    this.classroom.turno = Shifts.get(id).label;
  }

  private loadStudentList(classes) {
    classes.forEach(_class => {
      _class.alunos.forEach(_student => {
        _student.turma = { sigla: _class.sigla };
        this.studentList.push(_student);
      });
    });
  }

  open() {
    this.state = States.get('A');
    this.prepareObject();
    this.loadingService.loading(true);
    this.attendanceService.open(this.attendance)
      .subscribe(
      data => {
        this.attendance.id = Number(data);
        this.alertService.successNoRedirect(SysMessages.get(21), 1000);
        this.loadingService.loading(false);
      },
      error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  register() {
    this.actRegister = true;
    this.title = 'Registrar Aula';
  }

  private validRegister() {
    if (!this.attendance.registro) {
      this.alertService.error(SysMessages.get(4));
      return false;
    }
    return true;
  }

  onSubmitRegister() {
    this.alertService.clear();
    if (this.validRegister()) {
      this.alertService.successNoRedirect(SysMessages.get(23));
      setTimeout(() => {
        this.actRegister = false;
        this.title = 'Efetuar Chamada';
        this.state = States.get('R');
      }, 1000);
    }
  }

  close() {
    this.prepareObject();
    this.loadingService.loading(true);
    this.attendanceService.close(this.attendance)
      .subscribe(
      data => {
        this.loadingService.loading(false);
        this.alertService.success(SysMessages.get(22), ['']);
      },
      error => {
        this.alertService.error(SysMessages.get(20));
      });
  }

  prepareObject() {
    this.attendance.alunos = [];
    this.attendance.classe.id = this.classroom.id;
    this.studentList.forEach(student => {
      this.attendance.alunos.push({
        id: student.id,
        presenca: !student.presenca
      });
    });
  }

}