import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarteiraProdutoRel, setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    objeto: Empresa = new Empresa;
    setupColumns = setupColumns;
    list: CarteiraSetup[] = [];


    constructor(
        private empresaService: EmpresaService,
        private setupService: CarteiraSetupService,
        private currency: CurrencyPipe,
    ) {
        // this.empresaService.createEmpresaObject.subscribe(res => {
        //     this.objeto = res ?? new Empresa;
        //     this.objeto.produto.map(item => {
        //         item.taxaAdm = this.currency.transform(item.taxaAdm, 'BRL', '', '1.2') + '%' as unknown as number;
        //         item.taxaPfee = this.currency.transform(item.taxaPfee, 'BRL', '', '1.2') + '%' as unknown as number;
        //         return item;
        //     })
        // });

        this.setupService.getList(1).subscribe(res => {
            this.list = res;
        });
    }

    ngOnInit(): void {
    }

}
