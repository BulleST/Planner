import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { CarteiraSetup, setupColumns } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Table } from 'src/app/utils/table';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    objeto: Empresa = new Empresa;
    columns = setupColumns;
    list: CarteiraSetup[] = [];
    tableLinks: MenuTableLink[] = [];
    empresaSelected = new Empresa;
    account?: Account;
    subscription: Subscription[] = [];

    constructor(
        public setupService: CarteiraSetupService,
        private empresaService: EmpresaService,
        private table: Table,
        private accountService: AccountService,
    ) {
        var list = this.setupService.list.subscribe(res => this.list = res);
        this.table.currentPage.next(1);
        var account = this.accountService.account.subscribe(res => this.account = res);
        var empresa = this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            if (res.id != 0)
                await lastValueFrom(this.setupService.getList());
        });
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [(res.ativo ? 'desabilitar' : 'habilitar')], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(list);
        this.subscription.push(account);
        this.subscription.push(empresa);
        this.subscription.push(selected);
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    create = (setupService: CarteiraSetupService = this.setupService): void => {
        setupService.setObject(new CarteiraSetup);
    }

}
