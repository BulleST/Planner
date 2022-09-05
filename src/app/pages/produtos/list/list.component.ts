import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { Produto, produtoColumns } from 'src/app/models/produto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
    selector: 'app-list-produtos',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    faHandHoldingDollar = faHandHoldingDollar;
    objeto: Empresa = new Empresa;
    produtoColumns = produtoColumns;
    list: Produto[] = [];

    constructor(
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private currency: CurrencyPipe
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
            this.objeto.produto.map(item => {
                item.taxaAdm = this.currency.transform(item.taxaAdm, 'BRL', '', '1.2') + '%' as unknown as number;
                item.taxaPfee = this.currency.transform(item.taxaPfee, 'BRL', '', '1.2') + '%' as unknown as number;
                return item;
            })
        });

        this.produtoService.getList(1).subscribe(res => {
            this.list = res;
        });
    }

    ngOnInit(): void {
    }

}
