import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {
  
    @Input() title: string;
    @Input() openButton: string;

    constructor(private modalService: NgbModal) {}

    open(content) {
        this.modalService.open(content, { centered: true });
    }

}