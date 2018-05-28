import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SysMessages } from './../../common/mensagens/messages';
import { States } from './../../common/states/states';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { Attendance } from './shared/attendance.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent {
  state: any;
  attendance: Attendance;
  currentUser: any;

  constructor(
    private alertService: AlertService
  ) {
    this.state = States.get('P');
    this.attendance = new Attendance();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
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