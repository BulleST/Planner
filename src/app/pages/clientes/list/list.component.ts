import { Component, OnInit } from '@angular/core';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FilterMatchMode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { FilterDisplay, FilterType, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Account } from 'src/app/models/account.model';
import { Cliente, clienteColumns } from 'src/app/models/cliente.model';
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
export class ListComponent implements OnInit {
    faCity = faCity;
    list: Cliente[] = [];
    columns = clienteColumns;
    tableLinks: MenuTableLink[] = [];
    empresaSelected = new Empresa;
    account?: Account;

    constructor(
        private table: Table,
        public crypto: Crypto,
        private clienteService: ClienteService,
        public plannerService: PlannerService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        this.accountService.account.subscribe(res => this.account = res);
        this.clienteService.list.subscribe(res => this.list = res);
        this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            await lastValueFrom(this.clienteService.getList());
        });
        
        this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Ver planner', routePath: ['planner'], paramsFieldName: ['id'] }, 
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                    // { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });


        if ([1,2].includes(this.accountService.accountValue?.perfilAcesso_Id ?? 0)) {
            this.columns.splice(2, 0, {
                field: 'account.email', 
                header: 'Cadastrado por', 
                maskType: MaskType.undefined,
                filterType: FilterType.text, 
                filterDisplay: FilterDisplay.menu,
                filterShowAddButton: false,
                filterShowMatchMode: false,
                filterMatchMode: FilterMatchMode.CONTAINS,
            });
        }
    }

    ngOnInit(): void {
    }

    create = (plannerService: PlannerService = this.plannerService): void => {
        plannerService.setObject(new Planejamento);
    }
}
