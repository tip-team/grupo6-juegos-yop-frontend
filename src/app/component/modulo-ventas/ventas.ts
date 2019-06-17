import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pago } from '../../model/pago';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'ventas',
    templateUrl: './ventas.html',
    styleUrls: ['./ventas.css']
})
export class ModuloVentasComponent implements AfterViewInit {

    ventasFileName = 'ventas-' + formatDate(new Date(), 'dd-MM-yyyy', 'en') + '.csv';
    displayedColumns = ['idCompra', 'nombreProducto', 'monto', 'montoRecibido', 'estadoDePago', 'fecha', 'nombre', 'telefono', 'email'];
    pageSize: number[] = [10, 20, 50];
    dataSource: MatTableDataSource<Pago>;
    dataSourceHeaders = [{ label:'ID', key: 'idCompra'}, { label:'NOMBRE', key: 'nombreProducto'}, { label:'MONTO', key: 'monto'}, { label:'MONTO RECIBIDO', key: 'montoRecibido'}, { label:'ESTADO', key: 'estadoDePago'}, { label:'FECHA', key: 'fecha'}, { label:'EMAIL', key: 'email'}, { label: 'TELEFONO', key: 'telefono'}, { label: 'NOMBRE', key: 'nombre'}];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private elem: ElementRef, private mpService: MercadoPagoService) {
        this.mpService.getAllPagos().subscribe(pagosResponse => {
            this.dataSource = new MatTableDataSource(pagosResponse);
            this.dataSource.paginator = this.paginator;
        });
    }

    ngAfterViewInit() {
        const matPaginator = this.elem.nativeElement.querySelectorAll('.mat-paginator-page-size-label');
        matPaginator[0].innerText = 'Cantidad de ventas por página:';
    }

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

}

