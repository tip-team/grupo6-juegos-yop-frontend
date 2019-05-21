import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { ModalAgregarProductoComponent, modalAgregarProductoEvent } from '../modal-agregar-producto/modal-agregar-producto';
import { ModalEliminarProductoComponent } from '../modal-eliminar-producto/modal-eliminar-producto';
import { ModalEditarProductoComponent, modalEditarProductoEvent } from '../modal-editar-producto/modal-editar-producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'producto',
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ModuloProductoComponent implements AfterViewInit {

  productos;
  displayedColumns = ['nombre', 'precio', 'imagen', 'habilitado', 'actions'];
  pageSize: number[] = [10, 20, 50];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService: ProductoService, private elem: ElementRef, private modalService: NgbModal, private _service: NotificationsService) {
    modalAgregarProductoEvent.on('agregarProducto', producto => {
      this.productos.push(producto);
      this.agregarProductos(this.productos);
      this._service.success(`Se agrego el producto ${producto.nombre} correctamente.`, '', {
        timeOut: 8000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true
      });
    });

    modalEditarProductoEvent.on('editarProducto', (producto, nombreProducto) => {
      this.productos[this.productos.findIndex(eachProducto => eachProducto.id === producto.id)] = producto;
      this.agregarProductos(this.productos);
      this._service.success(`Se actualizo el producto ${nombreProducto} correctamente.`, '', {
        timeOut: 8000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true
      });
    });
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    const matPaginator = this.elem.nativeElement.querySelectorAll('.mat-paginator-page-size-label');
    matPaginator[0].innerText = "Cantidad de productos por página:";
  }

  crear() {
    this.modalService.open(ModalAgregarProductoComponent, { backdrop: 'static', keyboard: false });
  }

  borrar(producto: Producto) {
    const modalRef = this.modalService.open(ModalEliminarProductoComponent);
    modalRef.componentInstance.producto = producto;
    modalRef.result.finally(() => this.refresh());
  }

  editar(producto: Producto) {
    const modalRef = this.modalService.open(ModalEditarProductoComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.producto = producto;
  }

  private refresh() {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoService.getAllProductos().subscribe(productosResponse => {
      this.agregarProductos(productosResponse);
    }, error => console.log(error));
  }

  private agregarProductos(productos) {
    this.productos = productos;
    this.dataSource = new MatTableDataSource(productos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
