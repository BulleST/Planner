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
    tableLinks: MenuTableLink[] = [];

    selectedItems: any[] = [];

    constructor(
        private userService: UsuarioService,
        private empresaService: EmpresaService,
        private table: Table
    ) { 

        this.userService.list.subscribe(res => this.list = res);
        this.userService.getList().subscribe();


        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
        ];

        this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                    { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });

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

}
