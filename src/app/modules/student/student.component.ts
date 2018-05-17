import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Student } from './shared/student.model';
import { StudentService } from './shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent {
  filter: Student;
  studentList: Student[];

  //dependency injection
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    //init;
    this.filter = new Student();
    this.studentList = [];
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.studentService.list(this.filter)
      .subscribe(data => {
        this.studentList = <Student[]>data;
        if (this.studentList.length == 0) {
          this.alertService.error(SysMessages.get(7));
        }
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  goBack(): void {
    this.location.back();
  }
}