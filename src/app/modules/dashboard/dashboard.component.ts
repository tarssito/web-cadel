import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';
import { Weekdays } from './../../common/weekdays/weekdays';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { DashboardService } from './shared/dashboard.service';
import { Teacher } from './../teacher/shared/teacher.model';
import { Classroom } from './../classroom/shared/classroom.model';
var _ = require('lodash');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  currentUser: Teacher;
  classroomList: Classroom[];
  rows: Classroom[];
  alertMessage: string;

  //dependency injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private dashboardService: DashboardService
  ) {
    //init
    this.classroomList = [];
    this.rows = [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser.id = 3;
    this.alertMessage = SysMessages.get(18);
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.dashboardService.list(this.currentUser)
      .subscribe(data => {
        this.classroomList = <Classroom[]>data;
        this.formatWeekdayDescription();
        if (this.classroomList.length > 0) {
          this.chunkClassroom();
        }
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  private formatWeekdayDescription() {
    this.classroomList.forEach(item => {
      item.descricaoDia = Weekdays.get(item.dia).label;
    });
  }

  private chunkClassroom() {
    let qty = Math.floor(this.classroomList.length / 3) || 1;
    this.rows.push(_.chunk(this.classroomList, qty));
  }

}
