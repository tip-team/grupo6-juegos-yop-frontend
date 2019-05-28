import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate} from '@angular/animations';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AppComponent } from '../../app.component';
import { AuthService } from 'src/app/service/JWT/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)',
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)',
      })),
      transition('* => *', animate('600ms ease-in-out'))
    ]),
    trigger('turnArrow', [
      state('down', style({
        transform: 'rotate(360deg)'
      })),
      state('right', style({
      })),
      transition('* => *', animate('800ms ease-in-out'))
    ]),
    trigger('juegosYopMenu', [
      state('off', style({
        transform: 'rotate(-360deg)'
      })),
      transition('* => *', animate('800ms ease-in-out'))
    ])
  ]
})
export class NavBarComponent {
  menuState = 'in';
  arrowState = 'right';
  juegosYopMenu = 'on';
  title: string;
  app = AppComponent;
  stylePosition;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService, private deviceService: DeviceDetectorService) {
    const bottomPosition = this.deviceService.isMobile() ? '63' : '0';
    this.stylePosition = {'position': 'absolute', 'bottom': bottomPosition + 'px'};
    const baseUrl = '/';
    if (this.router.url === baseUrl) {
      this.router.navigateByUrl(baseUrl + this.app.INVENTARIO.path);
    }
    this.setTitle();
  }

  setTitle() {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) { route = route.firstChild; }
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      this.title = event.title;
    });
  }

  toogleMenu() {
    this.juegosYopMenu = this.juegosYopMenu === 'off' ? 'on' : 'off';
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toogleSubMenu() {
    this.arrowState = this.arrowState === 'down' ? 'right' : 'down';
  }

  clickRoute() {
    this.menuState = 'out';
    this.juegosYopMenu = 'off';
  }

  openPage(url: string) {
    window.open(url, '_blank');
  }

  openFacebook() {
    this.openPage('https://bit.ly/2WyrzSC');
  }

  openInstagram() {
    this.openPage('https://bit.ly/2TJ3lTO');
  }

}
