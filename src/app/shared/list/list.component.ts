import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list-shared',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;
    loading = false;

    @Input() createLink: string[] = [];
    @Input() list: any[] = [];
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator: boolean = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() canCreate = true;
    @Input() columns = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    ];

    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];

    constructor(
        private table: Table,
        public crypto: Crypto,
    ) {
        this.filters = this.columns.map(x => x.field);

        this.table.loading.subscribe(res => {
            this.loading = res
        });
        this.table.selected.subscribe(res => this.selected = res);
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) 
            this.list = changes['list'].currentValue;
        if (changes['createLink']) 
            this.createLink = changes['createLink'].currentValue;
        if (changes['filterLink']) 
            this.filterLink = changes['filterLink'].currentValue;
        if (changes['filterTable']) 
            this.filterTable = changes['filterTable'].currentValue;
        if (changes['paginator']) 
            this.paginator = changes['paginator'].currentValue;
        if (changes['sortTable']) 
            this.sortTable = changes['sortTable'].currentValue;
        if (changes['menuTable']) 
            this.menuTable = changes['menuTable'].currentValue;
        if (changes['columns']) 
            this.columns = changes['columns'].currentValue;
        if (changes['canCreate']) 
            this.canCreate = changes['canCreate'].currentValue;
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

    getCellData(row: any, col: any): any {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        for (const prop of nestedProperties) {
            value = value[prop] ?? '-';
        }

        return value ?? '-';
    }
}
