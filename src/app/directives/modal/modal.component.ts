import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './../../login/shared/login.service';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    closeResult: string;
    private modalRef: any;

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private loginService: LoginService
    ) { }

    open() {
        this.modalRef = this.modalService.open(ModalComponent);
        this.modalRef.componentInstance.title = 'Confirmação';
        this.modalRef.componentInstance.content = 'Deseja realmente sair do sistema?';
    }

    confirm() {
        this.loginService.logout();
        window.location.href = '/login';
    }

}