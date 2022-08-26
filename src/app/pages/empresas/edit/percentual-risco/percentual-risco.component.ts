import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { percentualRiscoColumns } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-percentual-risco',
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
        private empresaService: EmpresaService,
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


}
