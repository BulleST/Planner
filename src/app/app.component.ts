import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { EmpresaService } from './services/empresa.service';
import { IsMobile } from './utils/mobile';
import { ModalOpen } from './utils/modal-open';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

    constructor(
        private isMobile: IsMobile,
        private modal: ModalOpen,
    ) {
        this.isMobile.set();
        this.modal.setOpen(false);
    }
    @HostListener('window:resize', ['$event'])
    set() {
       this.isMobile.set();
    }
    

}
