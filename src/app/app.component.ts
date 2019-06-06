import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static INVENTARIO = { title: 'Productos', path: 'productos'};
  static CRECER_JUGANDO = { title: 'Crecer Jugando', path: 'crecer-jugando'};
  static CONTACTO = { title: 'Contacto', path: 'contacto'};
  static NOSOTROS = { title: 'Nosotros', path: 'nosotros'};
  static ADMIN = { title: 'Admin', path: 'admin'};

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'juegos-yop',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/juegos-yop.svg')
    ).addSvgIcon(
        'instagram-brands',
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/instagram-brands.svg')
    ).addSvgIcon(
        'facebook-brands',
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/facebook-brands.svg')
    );
  }
}
