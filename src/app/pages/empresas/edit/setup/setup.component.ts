import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { CarteiraProdutoRel, setupRelColumns } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    loading = false;

    setupColumns = setupRelColumns;
    objeto: Empresa = new Empresa;
    setup: CarteiraSetup[] = [];
    rels: CarteiraProdutoRel[][] = [];

    constructor(
        private empresaService: EmpresaService,
        private currency: CurrencyPipe,
    ) {
    }

    ngOnInit(): void {
    }
}