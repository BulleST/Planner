import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Column } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { userColumns, Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    faUsers = faUsers;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;
    
    columns = userColumns;
    list: Usuario[] = [];
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    // routeRow: string[] = [];
    loading = false;
    tableLinks: MenuTableLink[] = [];

    constructor(
        private userService: UsuarioService,
        private empresaService: EmpresaService,
        private table: Table
    ) { 
        this.userService.getList(1).subscribe();
        this.userService.list.subscribe(res => this.list = res);
        this.filters = this.columns.map(x => x.field);
        this.table.loading.subscribe(res => {
            this.loading = res
        });

        this.table.selected.subscribe(res => {
            this.selected = res;
            if (this.selected) {
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.table.selectedItems.subscribe(res => this.selectedItems = res);

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
