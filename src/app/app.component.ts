import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { LoginService } from './login/shared/login.service';
import { ModalService } from './directives/modal/shared/modal.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  logout() {
    this.modalService.openModal();
    // this.loading = true;
    // this.loginService.logout();
    // window.location.href = '/login';
  }

}
