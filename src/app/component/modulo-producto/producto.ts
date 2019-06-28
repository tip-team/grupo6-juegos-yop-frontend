import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { ModalAgregarProductoComponent, modalAgregarProductoEvent } from '../modal-agregar-producto/modal-agregar-producto';
import { ModalEliminarProductoComponent, modalEliminarProductoEvent } from '../modal-eliminar-producto/modal-eliminar-producto';
import { ModalEditarProductoComponent, modalEditarProductoEvent } from '../modal-editar-producto/modal-editar-producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import clonedeep from 'lodash.clonedeep';
import { openModal } from '../../model/util';

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

  constructor(private productoService: ProductoService, private elem: ElementRef, private modalService: NgbModal, private _service: NotificationsService, private cd: ChangeDetectorRef) {
    const success = (accion, nombreProducto) => {
      this.updateProductos(this.productos);
      this._service.success(`Se ${accion} el producto ${nombreProducto} correctamente.`, '');
    };

    modalAgregarProductoEvent.on('agregarProducto', producto => {
      this.productos.push(producto);
      success('agregó', producto.nombre);
    });

    modalEditarProductoEvent.on('editarProducto', (producto, nombreProducto) => {
      this.productos[this.productos.findIndex(({id}) => id === producto.id)] = producto;
      success('actualizó', nombreProducto);
    });

    modalEliminarProductoEvent.on('eliminarProducto', (id, nombreProducto) => {
      this.productos = this.productos.filter(producto => producto.id !== id);
      success('eliminó', nombreProducto);
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

  open(modal) {
    return openModal(this.modalService, modal);
  }

  openWithProducto(modal, producto) {
    this.open(modal).componentInstance.producto = producto;
  }

  crear() {
    this.open(ModalAgregarProductoComponent);
  }

  borrar(producto: Producto) {
    this.openWithProducto(ModalEliminarProductoComponent, producto);
  }

  editar(producto: Producto) {
    this.openWithProducto(ModalEditarProductoComponent, producto);
  }

  private obtenerProductos() {
    this.productoService.getAllProductos().then(producto => this.updateProductos(producto));
  }

  private updateProductos(productos) {
    this.productos = productos;
    this.dataSource = new MatTableDataSource(productos);
    this.updateDesc();
    this.dataSource.paginator = this.paginator;
  }

  private updateDesc() {
    this.dataSource.data.forEach(producto => 
      this.productoService.getProductoDesc(producto.id).then(({imagenDesc}) => producto.imagenDesc = imagenDesc)
    );
    if (!(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }

}
