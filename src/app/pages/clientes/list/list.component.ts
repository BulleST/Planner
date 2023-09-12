import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FilterMatchMode } from 'primeng/api';
import { Subscription, lastValueFrom } from 'rxjs';
import { FilterDisplay, FilterType, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Account } from 'src/app/models/account.model';
import { Cliente, ClienteList, clienteColumns } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { AccountService } from 'src/app/services/account.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PlannerService } from 'src/app/services/planner.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faCity = faCity;
    list: ClienteList[] = [];
    columns = clienteColumns;
    tableLinks: MenuTableLink[] = [];
    empresaSelected = new Empresa;
    account?: Account;
    subscription: Subscription[] = [];

    constructor(
        private table: Table,
        public crypto: Crypto,
        private clienteService: ClienteService,
        public plannerService: PlannerService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        var list = this.clienteService.list.subscribe(res => this.list = res);
        this.subscription.push(list);

        this.table.currentPage.next(1);

        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);

        var empresa = this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            if (res.id != 0) {
                await lastValueFrom(this.clienteService.getList());
            }
        });
        this.subscription.push(empresa);
        
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Ver planner', routePath: ['planner'], paramsFieldName: ['id'] }, 
                ];

                // perfilAcesso_Id 3 - Backoffice -> Não pode realizar ações em planner que não o pertence
                if (this.account?.perfilAcesso_Id != 3 || this.account?.id == res.account_Id) {
                    this.tableLinks = [
                        { label: 'Ver planner', routePath: ['planner'], paramsFieldName: ['id'] }, 
                        { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] }
                    ];
                    this.tableLinks = this.table.encryptParams(this.tableLinks);
                } else if (this.account?.perfilAcesso_Id == 3 && this.account?.id != res.account_Id){
                    var id = this.crypto.encrypt(res.id) ?? '';
                    var accountRoleId = this.crypto.encrypt(this.account.perfilAcesso_Id) ?? '';
                    this.tableLinks = [
                        { label: 'Ver planner', fullRoute: ['planner', id, accountRoleId], routePath: [] }, 
                    ];
                }
            }
        });
        this.subscription.push(selected);            


        // if ([1,2].includes(this.accountService.accountValue?.perfilAcesso_Id ?? 0)) {
        //     this.columns = Object.assign([], clienteColumns);  
        //     this.columns.splice(2, 0, {
        //         field: 'account.email', 
        //         header: 'Cadastrado por', 
        //         maskType: MaskType.undefined,
        //         filterType: FilterType.text, 
        //         filterDisplay: FilterDisplay.menu,
        //         filterShowAddButton: false,
        //         filterShowMatchMode: false,
        //         filterMatchMode: FilterMatchMode.CONTAINS,
        //     });
        // }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    create = (plannerService: PlannerService = this.plannerService): void => {
        plannerService.setObject(new Planejamento);
    }
}
