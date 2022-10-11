import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { IsMobile } from './utils/mobile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private isMobile: IsMobile
    ) {
        this.isMobile.set();
    }
    ngOnInit(): void {
        
    }
    @HostListener('window:resize', ['$event'])
    set() {
       this.isMobile.set();
    }
    

}
