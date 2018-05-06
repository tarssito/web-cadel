import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location
  ) {
    //init;
    this.filter = new Student();
    this.studentList = [];
    this.search();
  }

  search(): void {
    this.studentList = JSON.parse(localStorage.getItem('students')) || [];
  }

  goBack(): void {
    this.location.back();
  }
}
