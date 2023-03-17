import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCity, faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { FilterMatchMode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { Column, FilterDisplay, FilterType, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
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
    faFilter = faFilter;
    faEllipsisV = faEllipsisV;
    faCity = faCity;
    faTimes = faTimes;

    list: Cliente[] = [];
    selected?: Cliente;
    selectedItems: Cliente[] = [];
    loading = true;
    columns = clienteColumns;
    filters: string[] = [];
    tableLinks: MenuTableLink[] = [];
    empresaSelected: Empresa = new Empresa;

    constructor(
        private table: Table,
        public crypto: Crypto,
        private mask: MaskApplierService,
        private router: Router,
        private clienteService: ClienteService,
        private plannerService: PlannerService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        this.filters = this.columns.map(x => x.field);
        this.table.loading.subscribe(res => this.loading = res);
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
        this.table.selected.subscribe(res => {
            this.selected = res;
            this.tableLinks = [
                { label: 'Ver planner', routePath: ['planner'], paramsFieldName: ['id'] }, // id = cliente_Id
                { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
            ];
            if (this.selected) {
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });

        this.clienteService.list.subscribe(res => {
            this.list = res;
        });
        this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            await lastValueFrom(this.clienteService.getList(res.id));
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

    create() {
        this.plannerService.setObject(new Planejamento);
        this.router.navigate(['clientes', 'planner'])
    }
    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    onAllRowToggle(event: any) {
        this.table.onAllRowToggle(event);
    }
    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }
}
