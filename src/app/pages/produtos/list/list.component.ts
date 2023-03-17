import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Empresa } from 'src/app/models/empresa.model';
import { Produto, produtoColumns } from 'src/app/models/produto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Table } from 'src/app/utils/table';

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
    tableLinks: MenuTableLink[] = [];

    constructor(
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private currency: CurrencyPipe,
        private table: Table,

    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
        });
        
        this.produtoService.list.subscribe(res => this.list = res);
        this.produtoService.getList().subscribe();

        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
        ];

        this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
    }

    ngOnInit(): void {
    }

}
