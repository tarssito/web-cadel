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
import { Shifts } from '../../common/shift/shift';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent {
  state: any;
  attendance: Attendance;
  currentUser: any;
  classroom: Classroom;
  studentList: any;

  constructor(
    private alertService: AlertService,
    private classroomService: ClassroomService,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.state = States.get('P');
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
  }

  close() {
    this.state = States.get('F');
  }

  register() {
    this.state = States.get('R');
  }

  save() {

  }

}