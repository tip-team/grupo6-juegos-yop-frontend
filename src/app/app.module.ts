import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatTabsModule , MatFormFieldModule, MatInputModule, MatSlideToggleModule  } from '@angular/material';
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
import { AgregarProductoComponent } from './component/agregar-producto/agregar-producto';
import { VentasComponent } from './component/ventas/ventas';
import { ModalAgregarProductoComponent } from './component/modal-agregar-producto/modal-agregar-producto';
import { ModalComponent } from './component/modal/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    VentasComponent,
    ModalComponent,
    ModalAgregarProductoComponent
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
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgbModule.forRoot()
  ],
  entryComponents: [ ModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
