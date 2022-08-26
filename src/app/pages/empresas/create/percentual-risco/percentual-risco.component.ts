import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faFileCircleCheck, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
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
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private mask: MaskApplierService
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.objeto = res ?? new Empresa;
            this.objeto.percentualRisco.map(item => {
                item.baixissimo = this.mask.applyMask(item.baixissimo.toString(), 'separator.2') + '%'  as unknown as number;
                item.baixo = this.mask.applyMask(item.baixo.toString(), 'separator.2') + '%'  as unknown as number;
                item.moderado = this.mask.applyMask(item.moderado.toString(), 'separator.2') + '%'  as unknown as number;
                item.arrojado = this.mask.applyMask(item.arrojado.toString(), 'separator.2') + '%'  as unknown as number;
                item.superArrojado = this.mask.applyMask(item.superArrojado.toString(), 'separator.2') + '%'  as unknown as number;
                item.hedge = this.mask.applyMask(item.hedge.toString(), 'separator.2') + '%'  as unknown as number;
                return item;
            })
        });
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
