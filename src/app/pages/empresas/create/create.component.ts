import { Component, OnDestroy } from '@angular/core';
import { faArrowRight, faChevronLeft, faCity, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';
import { MenuItems } from '../shared/menu-items/menu-items';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnDestroy {
    faChevronLeft = faChevronLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    objeto: Empresa = new Empresa;
    erro: any[] = [];

    index: number = 1;
    cnpjValid = false;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        menuItems: MenuItems,
        private modal: ModalOpen
    ) {
        
        if ( this.empresaService.object == undefined)
            this.empresaService.setObject(new Empresa, 'CreateComponent');
            
        var empresa = this.empresaService.empresa.subscribe(res => {
            this.objeto = res;
            this.objeto.produto = this.objeto.produto ?? []; 
            this.objeto.percentualRisco = this.objeto.percentualRisco ?? []; 
            this.objeto.cliente = this.objeto.cliente ?? []; 
            this.objeto.account = this.objeto.account ?? []; 
            this.objeto.carteiraSetup = this.objeto.carteiraSetup ?? []; 
        });
        this.subscription.push(empresa);   
    }
     
    ngOnDestroy(): void {
        this.empresaService.setObject(new Empresa, 'ngOnDestroy')
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar();
    }

}
