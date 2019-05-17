import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatTabsModule , MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventarioComponent } from './component/inventario/inventario';
import { CrecerJugandoComponent } from './component/crecer-jugando/crecer-jugando';
import { ContactoComponent } from './component/contacto/contacto';
import { NosotrosComponent } from './component/nosotros/nosotros';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './component/login/login';
import { AdminComponent } from './component/admin/admin';
import { ModuloProductoComponent} from './component/modulo-producto/producto';
import { ModuloVentasComponent } from './component/modulo-ventas/ventas';
import { ModalAgregarProductoComponent } from './component/modal-agregar-producto/modal-agregar-producto';
import { ModalEliminarProductoComponent } from './component/modal-eliminar-producto/modal-eliminar-producto';
import { ModalEditarProductoComponent } from './component/modal-editar-producto/modal-editar-producto';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from './component/email-modal/email-modal';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InventarioComponent,
    CrecerJugandoComponent,
    ContactoComponent,
    NosotrosComponent,
    ProductCardComponent,
    LoginComponent,
    AdminComponent,
    ModuloProductoComponent,
    ModuloVentasComponent,
    ModalAgregarProductoComponent,
    ModalEliminarProductoComponent,
    ModalEditarProductoComponent,
    EmailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule.forRoot()
  ],
  entryComponents: [ ModalAgregarProductoComponent, ModalEliminarProductoComponent, ModalEditarProductoComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
