import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faFileCircleCheck, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { setupRelColumns } from 'src/app/models/carteira-produto-rel';
import { Empresa } from 'src/app/models/empresa.model';
import { percentualRiscoColumns } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-percentual-risco-create',
    templateUrl: './percentual-risco.component.html',
    styleUrls: ['./percentual-risco.component.css']
})
export class PercentualRiscoComponent implements OnInit {
    faPercent = faPercent;
    faArrowLeft = faArrowLeft;
    faCheck = faCheck;
    objeto: Empresa = new Empresa;
    percentualRiscoColumns = percentualRiscoColumns;
    tableLinks: MenuTableLink[] = [];
    
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private mask: MaskApplierService
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = Object.assign(res);
            // this.objeto.percentualRisco.map(item => {
            //     item.baixissimo = this.mask.applyMask(item.baixissimo.toString(), 'separator.2') + '%'  as unknown as number;
            //     item.baixo = this.mask.applyMask(item.baixo.toString(), 'separator.2') + '%'  as unknown as number;
            //     item.moderado = this.mask.applyMask(item.moderado.toString(), 'separator.2') + '%'  as unknown as number;
            //     item.arrojado = this.mask.applyMask(item.arrojado.toString(), 'separator.2') + '%'  as unknown as number;
            //     item.superArrojado = this.mask.applyMask(item.superArrojado.toString(), 'separator.2') + '%'  as unknown as number;
            //     item.hedge = this.mask.applyMask(item.hedge.toString(), 'separator.2') + '%'  as unknown as number;
            //     return item;
            // });
        });
        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ]
    }

    ngOnInit(): void {
    }

    next() {
        // this.router.navigate(['empresas', 'cadastrar', 'finalizar'])
    }
    
    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'setup'])
    }

}
