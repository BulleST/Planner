import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChevronLeft, faCity, faEllipsisV, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';
import { MenuItems } from '../shared/menu-items/menu-items';
// import { MenuItems } from '../shared/menu-items';
// import { MenuItems } from '../shared/menu-items';

// export interface MenuItem {
//     id: number,
//     label: string,
//     routerLink: string,
//     command: (event: any) => void,
//     faIcon?: IconDefinition,
//     iconClass?: string,
// }

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
    faChevronLeft = faChevronLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    objeto: Empresa = new Empresa;
    erro: any[] = [];

    index: number = 1;
    cnpjValid = false;

    constructor(
        private empresaService: EmpresaService,
        menuItems: MenuItems,
        private modal: ModalOpen
    ) {
        
        if ( this.empresaService.object == undefined)
            this.empresaService.setObject(new Empresa, 'CreateComponent');
            
        this.empresaService.empresa.subscribe(res => {
            this.objeto = res;
            this.objeto.produto = this.objeto.produto ?? []; 
            this.objeto.percentualRisco = this.objeto.percentualRisco ?? []; 
            this.objeto.cliente = this.objeto.cliente ?? []; 
            this.objeto.account = this.objeto.account ?? []; 
            this.objeto.carteiraSetup = this.objeto.carteiraSetup ?? []; 
        });   
    }

    ngOnInit(): void {
    }
            
    ngOnDestroy(): void {
        this.empresaService.setObject(new Empresa, 'ngOnDestroy')
        this.modal.setOpen(false);
    }

    voltar() {
        this.modal.voltar();
    }

}
