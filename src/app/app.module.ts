import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
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
import { AgregarProductoComponent } from './component/CRUD/producto/agregarProducto';
import { EliminarProductoComponent} from './component/CRUD/producto/eliminarProducto';
import { EditarProductoComponent} from './component/CRUD/producto/editarProducto';
import { ModalModule } from 'ngx-bootstrap';

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
    AgregarProductoComponent,
    EliminarProductoComponent,
    EditarProductoComponent
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
    MatButtonModule,
    MatIconModule,
    ModalModule.forRoot()
  ],
  entryComponents: [AgregarProductoComponent, EliminarProductoComponent, EditarProductoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
