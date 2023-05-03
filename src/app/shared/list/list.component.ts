import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list-shared',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListSharedComponent implements OnInit, OnChanges {
    maskType = MaskType;
    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;
    loading = false;
    Role = Role;

    @Input() list: any[] = [];
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator: boolean = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() createLink: string[] = [];
    @Input() canCreate = true;
    @Input() selectable = true;
    @Input() columns = [{ field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },];
    @Input() tableLinks: MenuTableLink[] = [];
    @Input() onCreate: any;
    selected?: any;
    // selectedItems: any[] = [];
    filters: string[] = [];
    routeRow: string[] = [];

    constructor(
        private table: Table,
        private router: Router
    ) {
        this.filters = this.columns.map(x => x.field);
        this.table.loading.subscribe(res => this.loading = res);
        if (this.selectable) {
            this.table.selected.subscribe(res => this.selected = res);
            // this.table.selectedItems.subscribe(res => this.selectedItems = res);
        }

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) 
            this.list = changes['list'].currentValue;
        if (changes['selectable'])
            this.selectable = changes['selectable'].currentValue;
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
        if (changes['columns']) {
            this.columns = changes['columns'].currentValue;
            this.filters = this.columns.map(x => x.field)
        }
        if (changes['canCreate'])
            this.canCreate = changes['canCreate'].currentValue;
        if (changes['onCreate']) 
            this.onCreate = changes['onCreate'].currentValue;
        if (changes['tableLinks'])
            this.tableLinks = changes['tableLinks'].currentValue;
    }


    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    // onAllRowToggle(event: any) {
    //     this.table.onAllRowToggle(event);
    // }

    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }

    create() {
        if (this.canCreate) {
            if (this.onCreate) {
                this.onCreate();
            }
        }
    }

    eval(str, item) {
        return eval(str) as boolean
    }
}

