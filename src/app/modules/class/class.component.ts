import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SysMessages } from './../../common/mensagens/messages';

import { AlertService } from './../../directives/alert/shared/alert.service';
import { LoadingService } from './../../directives/loading/shared/loading.service';

import { Class } from './shared/class.model';
import { ClassService } from './shared/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html'
})
export class ClassComponent {
  filter: Class;
  classList: Class[];

  //dependency injection
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    this.filter = new Class();
    this.classList = [];
    this.search();
  }

  search(): void {
    this.loadingService.loading(true);
    this.classService.list(this.filter)
      .subscribe(data => {
        this.classList = <Class[]>data;
        this.loadingService.loading(false);
      }, error => {
        this.alertService.error(error);
      });
  }

  goBack(): void {
    this.location.back();
  }

}