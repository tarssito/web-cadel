import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { LoginService } from './login/shared/login.service';

import { ModalComponent } from './directives/modal/modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser = null;
  modalInstance: ModalComponent;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.modalInstance = new ModalComponent(this.modalService, this.activeModal);
  }

  logout() {
    this.modalInstance.open();
  }
  
  exit() {
    this.loginService.logout();
    window.location.href = '/login';
  }

}
