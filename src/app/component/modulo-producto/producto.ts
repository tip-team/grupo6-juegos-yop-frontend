import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { ModalAgregarProductoComponent, modalAgregarProductoEvent } from '../modal-agregar-producto/modal-agregar-producto';
import { ModalEliminarProductoComponent, modalEliminarProductoEvent } from '../modal-eliminar-producto/modal-eliminar-producto';
import { ModalEditarProductoComponent, modalEditarProductoEvent } from '../modal-editar-producto/modal-editar-producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import  clonedeep from 'lodash.clonedeep';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'producto',
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ModuloProductoComponent implements AfterViewInit {

  productos;
  displayedColumns = ['nombre', 'precio', 'imagen', 'imagenDesc', 'habilitado', 'actions'];
  pageSize: number[] = [10, 20, 50];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService: ProductoService, private elem: ElementRef, private modalService: NgbModal, private _service: NotificationsService, private cd: ChangeDetectorRef) {
    const success = text => this._service.success(text, '', {
        timeOut: 8000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true
    });

    modalAgregarProductoEvent.on('agregarProducto', producto => {
      this.productos.push(producto);
      this.updateProductos(this.productos);
      success(`Se agrego el producto ${producto.nombre} correctamente.`);
    });

    modalEditarProductoEvent.on('editarProducto', (producto, nombreProducto) => {
      this.productos[this.productos.findIndex(eachProducto => eachProducto.id === producto.id)] = producto;
      this.updateProductos(this.productos);
      success(`Se actualizo el producto ${nombreProducto} correctamente.`);
    });

    modalEliminarProductoEvent.on('eliminarProducto', (id, nombreProducto) => {
      this.productos = this.productos.filter(producto => producto.id !== id);
      this.updateProductos(this.productos);
      success(`Se elimino el producto ${nombreProducto} correctamente.`);
    })
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    const matPaginator = this.elem.nativeElement.querySelectorAll('.mat-paginator-page-size-label');
    matPaginator[0].innerText = 'Cantidad de productos por página:';
  }

  onListDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const priorities = this.dataSource.data.map(({id: idProducto}, index) => ({
      idProducto,
      prioridad: index + 1
    })).reverse();
    this.productoService.updatePriorities(priorities).subscribe();
    this.dataSource.data = clonedeep(this.dataSource.data);
  }

  crear() {
    this.modalService.open(ModalAgregarProductoComponent, { backdrop: 'static', keyboard: false, centered: true });
  }

  borrar(producto: Producto) {
    const modalRef = this.modalService.open(ModalEliminarProductoComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.producto = producto;
  }

  editar(producto: Producto) {
    const modalRef = this.modalService.open(ModalEditarProductoComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.producto = producto;
  }

  private obtenerProductos() {
    this.productoService.getAllProductos().then(productosResponse => {
      this.updateProductos(productosResponse);
     }, error => console.log(error));
  }

  private updateProductos(productos) {
    this.productos = productos;
    this.dataSource = new MatTableDataSource(productos);
    this.updateDesc();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDesc() {
    this.dataSource.data.forEach(p => {
      this.productoService.getProductoDesc(p.id).then(response => {
        p.imagenDesc = response.imagenDesc;
      });
    });
    this.cd.detectChanges();
  }

}
