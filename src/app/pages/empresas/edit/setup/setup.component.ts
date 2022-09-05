import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { CarteiraProdutoRel, setupColumns } from 'src/app/models/carteiraSetup-produto.model';
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

    setupColumns = setupColumns;
    objeto: Empresa = new Empresa;
    setup: CarteiraSetup[] = [];
    rels: CarteiraProdutoRel[][] = [];

    constructor(
        private empresaService: EmpresaService,
        private currency: CurrencyPipe,
    ) {
        // this.empresaService.createEmpresaObject.subscribe(res => {
        //     this.objeto = res;
        //     this.rels = this.objeto.carteiraSetup.map(item => {
        //         return item.carteiraProdutoRel.map(rel => {
        //             rel.percentual = this.currency.transform(rel.percentual, 'BRL', '', '1.2') + '%' as unknown as number;
        //             rel.carteiraSetup = item;
        //             return rel
        //         })
        //         return item.carteiraProdutoRel;
        //     })
        //     console.log(this.rels);
        //     this.objeto.carteiraSetup.map(item => {
        //         item.carteiraProdutoRel.map(rel => {
        //             // rel.percentual = this.currency.transform(rel.percentual, 'BRL', '', '1.2') + '%' as unknown as number;
        //             return rel;
        //         })
        //         return item;
        //     });

        //     this.setup = this.objeto.carteiraSetup;
        // });
    }

    ngOnInit(): void {
    }
}