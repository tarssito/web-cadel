import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from './../../directives/loading/shared/loading.service';
import { Teacher } from './shared/teacher.model';
import { TeacherService } from './shared/teacher.service';
import { PAGINATION } from './../../common/pagination.config';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {
  p: number = 1;
  filter: Teacher;
  teacherList: Teacher[];
  PAGINATION: Object;

  //dependency injection
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService
  ) {
    //init;
    this.filter = new Teacher();
    this.teacherList = [];
    this.PAGINATION = PAGINATION;
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    setTimeout(() => {
      for (let i = 0; i < 102; i++) {
        let _teacher = new Teacher();
        _teacher.id = i + 1;
        _teacher.nome = 'Professor ' + (i + 1);
        _teacher.matricula = '04215100' + (i + 1);
        this.teacherList.push(_teacher);
      }
      // this.teacherList = JSON.parse(localStorage.getItem('professores')) || [];
      this.loadingService.loading(false);
    }, 500);
  }

  goBack(): void {
    this.location.back();
  }
}