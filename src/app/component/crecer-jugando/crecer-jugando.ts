import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'crecer-jugando',
    templateUrl: './crecer-jugando.html',
    styleUrls: ['./crecer-jugando.css']
})
export class CrecerJugandoComponent {

    textSize;
    imagenHeight;
    imagenMargin;

    constructor(private deviceService: DeviceDetectorService) {
        const isMobile = this.deviceService.isMobile();
        const fontSizeTitle = isMobile ? '18' : '25.7';
        this.textSize = { 'font-size': fontSizeTitle + 'px' };
        const imagenHeighResponsive = isMobile ? '80' : '90';
        this.imagenHeight = { 'max-height': imagenHeighResponsive + 'vh' };
        this.imagenMargin = isMobile ? { 'margin-top': '15px', 'margin-bottom': '20px' } : {};
    }

}