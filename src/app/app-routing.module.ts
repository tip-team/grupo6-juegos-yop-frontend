import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { InventarioComponent } from './component/inventario/inventario';
import { CrecerJugandoComponent } from './component/crecer-jugando/crecer-jugando';
import { ContactoComponent } from './component/contacto/contacto';
import { NosotrosComponent } from './component/nosotros/nosotros';
import { LoginComponent } from './component/login/login';

const routes: Routes = [
  {
      path: '',
      component: NavBarComponent,
      children: [
        {
          path: AppComponent.INVENTARIO.path,
          component: InventarioComponent,
          data: { title: AppComponent.INVENTARIO.title }
        },
        {
          path: AppComponent.CRECER_JUGANDO.path,
          component: CrecerJugandoComponent,
          data: { title: AppComponent.CRECER_JUGANDO.title }
        },
        {
          path: AppComponent.CONTACTO.path,
          component: ContactoComponent,
          data: { title: AppComponent.CONTACTO.title }
        },
        {
          path: AppComponent.NOSOTROS.path,
          component: NosotrosComponent,
          data: { title: AppComponent.NOSOTROS.title }
        },
        { 
          path:  AppComponent.ADMIN.path, 
          component: LoginComponent,
          data: { title: AppComponent.ADMIN.title }
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
