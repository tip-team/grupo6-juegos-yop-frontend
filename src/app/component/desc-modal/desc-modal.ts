import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../../service/producto/producto.service';

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
        this.productoService.getProductoDesc(this.idProducto).subscribe(response => {
            this.imagenDesc = response.imagenDesc;
        });
        this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true, size: 'lg' });
    }

}
