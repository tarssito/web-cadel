import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Teacher } from './shared/teacher.model';
import { TeacherService } from './shared/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {
  filter: Teacher;
  teacherList: Teacher[];

  //dependency injection
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    //init;
    this.filter = new Teacher();
    this.teacherList = [];
    this.search();
  }

  search(): void {
    this.teacherList = JSON.parse(localStorage.getItem('professores')) || [];
  }

  goBack(): void {
    this.location.back();
  }
}