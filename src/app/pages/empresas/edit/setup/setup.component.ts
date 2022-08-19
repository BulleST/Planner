import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    loading = false;

    setupColumns = setupColumns;
    objeto: Empresa = new Empresa;

    constructor(
        private empresaService: EmpresaService,
        private mask: MaskApplierService
    ) {
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
            this.objeto.carteiraSetup.map(item => {
                item.percentual = this.mask.applyMask(item.percentual.toString(), 'separator.2') + '%' as unknown as number;
                return item;
            });
        });
    }

    ngOnInit(): void {
    }
}