import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-template-incluir',
  templateUrl: './modal-template-incluir.component.html',
  styleUrls: ['./modal-template-incluir.component.css']
})
export class ModalTemplateIncluirComponent {
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open('teste');
    modalRef.componentInstance.name = 'World';
  }
}