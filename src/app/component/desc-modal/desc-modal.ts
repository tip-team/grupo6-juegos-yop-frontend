import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../../service/producto/producto.service';
import { openModal } from 'src/app/model/util';

@Component({
    selector: 'desc-modal',
    templateUrl: './desc-modal.html',
    styleUrls: ['./desc-modal.css']
})
export class DescModalComponent {

    @Input() idProducto: number;
    imagenDesc: string;

    constructor(private modalService: NgbModal, private productoService: ProductoService) { }

    openModal(content) {
        const { productoService, idProducto, modalService } = this;
        productoService.getProductoDesc(idProducto).then(({ imagenDesc }) => this.imagenDesc = imagenDesc);
        openModal(modalService, content, 'lg');
    }

}
