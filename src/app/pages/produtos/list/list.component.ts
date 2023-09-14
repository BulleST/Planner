import { Component, OnDestroy, OnInit } from '@angular/core';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
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
export class ListComponent implements OnDestroy {
    faHandHoldingDollar = faHandHoldingDollar;
    empresaSelected = new Empresa;
    columns = produtoColumns;
    list: Produto[] = [];
    tableLinks: MenuTableLink[] = [];
    account?: Account;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        public produtoService: ProdutoService,
        private table: Table,
        private accountService: AccountService,
    ) {
        var account = this.accountService.account.subscribe(res => this.account = res);
        var list = this.produtoService.list.subscribe(res => {
            this.list = res;
            this.list.filter(x => x.id == 61).forEach(x => {x.showMenuOption = false; x.canSelect = false});
        });
        this.table.currentPage.next(1);
        var empresa = this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            if (res.id != 0)
                await lastValueFrom(this.produtoService.getList());
        });
        var selected = this.table.selected.subscribe(res => {
            if (res && res.descricao != 'Conta Corrente') { // Conta corrente não pode ser editada, desabilitada ou excluida
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [(res.ativo ? 'desabilitar' : 'habilitar')], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            } else if (res && res.descricao != 'Conta Corrente') {
                this.table.onRowUnselect(res)
            } else{
                this.tableLinks = [];
            }
        });


        this.subscription.push(account);
        this.subscription.push(list);
        this.subscription.push(empresa);
        this.subscription.push(selected);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    create = (produtoService: ProdutoService = this.produtoService): void => {
        produtoService.setObject(new Produto);
    }

}
