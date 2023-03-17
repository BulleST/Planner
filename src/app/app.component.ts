import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { EmpresaService } from './services/empresa.service';
import { IsMobile } from './utils/mobile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private isMobile: IsMobile,
        private empresaService: EmpresaService
    ) {
        this.isMobile.set();
        // this.empresaService.getList().subscribe();
    }
    ngOnInit(): void {
        
    }
    @HostListener('window:resize', ['$event'])
    set() {
       this.isMobile.set();
    }
    

}
