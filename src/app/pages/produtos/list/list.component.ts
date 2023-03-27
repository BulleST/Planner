import { Component, OnInit } from '@angular/core';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Produto, produtoColumns } from 'src/app/models/produto.model';
import { AccountService } from 'src/app/services/account.service';
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
    empresaSelected = new Empresa;
    columns = produtoColumns;
    list: Produto[] = [];
    tableLinks: MenuTableLink[] = [];
    account?: Account;

    constructor(
        private empresaService: EmpresaService,
        public produtoService: ProdutoService,
        private table: Table,
        private accountService: AccountService,
    ) {
        this.accountService.account.subscribe(res => this.account = res);
        this.produtoService.list.subscribe(res => this.list = res);
        this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            if (res.id != 0) 
                await lastValueFrom(this.produtoService.getList());
        });
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
    
    create = (produtoService: ProdutoService = this.produtoService): void => {
        produtoService.setObject(new Produto);
    }

}
