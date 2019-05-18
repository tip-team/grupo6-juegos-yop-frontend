import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { ModalAgregarProductoComponent } from '../modal-agregar-producto/modal-agregar-producto';
import { ModalEliminarProductoComponent } from '../modal-eliminar-producto/modal-eliminar-producto';
import { ModalEditarProductoComponent } from '../modal-editar-producto/modal-editar-producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'producto',
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ModuloProductoComponent implements AfterViewInit {

  displayedColumns = ['nombre', 'precio', 'imagen', 'habilitado', 'actions'];
  pageSize: number[] = [10, 20, 50];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService: ProductoService, private elem: ElementRef, private modalService: NgbModal) {
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    const matPaginator = this.elem.nativeElement.querySelectorAll('.mat-paginator-page-size-label');
    matPaginator[0].innerText = "Cantidad de productos por página:";
  }

  crear() {
    this.modalService.open(ModalAgregarProductoComponent).result.finally(() => this.refresh());
 }

  borrar(producto: Producto) {
      const modalRef = this.modalService.open(ModalEliminarProductoComponent);
      modalRef.componentInstance.producto = producto;
      modalRef.result.finally(() => this.refresh());
  }

    editar(producto: Producto) {
        const modalRef = this.modalService.open(ModalEditarProductoComponent);
        modalRef.componentInstance.producto = producto;
        modalRef.result.finally(() => this.refresh());
    }
  private refresh() {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoService.getAllProductos().subscribe(productosResponse => {
      this.dataSource = new MatTableDataSource(productosResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => console.log(error));
  }

}
