import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from './shared/modal.service';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    modal: boolean;

    constructor(private modalService: ModalService) {
        this.modalService.getModal().subscribe(modal => { this.modal = modal; });
    }

}