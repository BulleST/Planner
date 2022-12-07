import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Column } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { CarteiraProdutoRel, setupRelColumns } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup, setupColumns } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    faFilter = faFilter;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    objeto: Empresa = new Empresa;
    setupColumns = setupColumns;
    list: CarteiraSetup[] = [];
    tableLinks: MenuTableLink[] = [];
    loading = false;
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    activityValues: number[] = [0, 100];

    constructor(
        private setupRelService: CarteiraProdutoRelService,
        private setupService: CarteiraSetupService,
        private table: Table,
    ) {

        this.setupService.list.subscribe(res => {
            this.list = res;
            this.list.map(x => {
                x.carteiraRiscoRel = x.carteiraRiscoRel ?? [];
                return x;
            })
        })
        this.setupService.getList().subscribe();

        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ];

        this.table.loading.subscribe(res => this.loading = res);
        this.table.selected.subscribe(res => {
            this.selected = res;
            if (this.selected) {
               this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
        this.filters = this.setupColumns.map(x => x.field);
    }

    ngOnInit(): void {
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
