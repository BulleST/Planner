import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCity, faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Column } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Cliente, clienteColumns } from 'src/app/models/cliente.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { ClienteService } from 'src/app/services/cliente.service';
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

    constructor(
        private table: Table,
        private clienteService: ClienteService,
        public crypto: Crypto,
        private mask: MaskApplierService,
        private router: Router,
        private plannerService: PlannerService,
    ) {
        this.filters = this.columns.map(x => x.field);
        this.table.loading.subscribe(res => this.loading = res);
        this.table.selected.subscribe(res => {
            this.selected = res;
            if (this.selected) {
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.table.selectedItems.subscribe(res => this.selectedItems = res);

        this.clienteService.list.subscribe(res => this.list = res);
        this.clienteService.getList().subscribe();

        this.tableLinks = [
            { label: 'Ver planner', routePath: ['planner'], paramsFieldName: ['id'] }, // id = cliente_Id
            { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
        ];
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
