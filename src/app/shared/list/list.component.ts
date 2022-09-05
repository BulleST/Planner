import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
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
    @Input() columns = [{ field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },];
    @Input() tableLinks: MenuTableLink[] = [];

    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    routeRow: string[] = [];

    constructor(
        private table: Table,
        private crypto: Crypto,
        private currency: CurrencyPipe,
        private mask: MaskApplierService,
        private datePipe: DatePipe,
    ) {
        this.filters = this.columns.map(x => x.field);

        this.table.loading.subscribe(res => {
            this.loading = res
        });
        this.table.selected.subscribe(res => {
            this.selected = res;
            if (this.selected) {
                this.tableLinks.map(link => {
                    if (link.paramsFieldName != undefined && link.paramsFieldName.length) {
                        var paramnsMap = link.paramsFieldName.map(p => {
                            return this.crypto.encrypt(this.selected[p]) ?? '';
                        })
                        link.fullRoute = [].concat(link.routePath as never[], paramnsMap as never[])
                    } else {
                        link.fullRoute = link.routePath;
                    }
                    return link
                });
            }
        });
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
            value = value[prop];
        }
        if (col.mask && value) {
            if (col.mask == MaskType.percentage) {
                try {
                    value = this.currency.transform(value.toString(), 'BRL', '', col.decimal) + '%';
                } catch (e) {
                }
            } else if (col.mask == MaskType.money) {
                value = this.currency.transform(value, 'BRL', col.moeda, col.decimal)
            } else if (col.mask == MaskType.date) {

            } else if (col.mask == MaskType.dateTime) {

            } else {
                return value ?? '-';
            }
        }
        return value ?? '-';
    }
}

