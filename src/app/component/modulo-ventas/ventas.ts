import { Component, ViewChild} from '@angular/core';
import { Pago } from '../../model/pago';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';

@Component({
    selector: 'ventas',
    templateUrl: './ventas.html',
    styleUrls: ['./ventas.css']
})
export class ModuloVentasComponent {

    displayedColumns = ['idCompra', 'nombreProducto', 'monto', 'montoRecibido', 'estadoDePago', 'fecha', 'email'];
    pageSize: number[] = [10, 20, 50];
    dataSource: MatTableDataSource<Pago>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private mpService: MercadoPagoService) {

        this.mpService.getAllPagos().subscribe(pagosResponse => {
          this.dataSource = new MatTableDataSource(pagosResponse);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, error => console.log(error));
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

}

