import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Student } from './shared/student.model';
import { StudentService } from './shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  filter: Student;
  studentList: Student[];

  //dependency injection
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.filter = new Student();
    this.studentList = [];
  }

  ngOnInit() {
  }

  search(): void {
    // this.studentList = JSON.parse(localStorage.getItem('students')) || [];
    let stA = new Student();
    stA.id = 1;
    stA.document = 93766787351;
    stA.mail = 'student.a@unifacs.com';
    stA.name = 'Fulano';
    stA.registration = '08462723';
    stA.sexo = 'M';
    let stB = new Student();
    stB.id = 1;
    stB.document = 93766787352;
    stB.mail = 'student.b@unifacs.com';
    stB.name = 'Ciclano';
    stB.registration = '08462724';
    stB.sexo = 'M';
    this.studentList.push(
      stA,
      stB
    );
  }

  goBack(): void {
    this.location.back();
  }
}
