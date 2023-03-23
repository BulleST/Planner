import { Component, OnInit } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { userColumns, Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
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
    Role = Role;
    columns = userColumns;
    list: Usuario[] = [];
    tableLinks: MenuTableLink[] = [];
    account = new Account;
    menuTable = true;
    empresaSelected = new Empresa;

    constructor(
        private userService: UsuarioService,
        private empresaService: EmpresaService,
        private table: Table,
        private accountService: AccountService
    ) { 
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
        this.userService.list.subscribe(res => this.list = res);
        this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            await lastValueFrom(this.userService.getList());
        });

        this.table.selected.subscribe(res => {
            if (res) { // se tiver linha selecionada
                /**
                 * O usuario master pode alterar 
                 * qualquer outro usuário exceto o admin
                 * O usuário backoffice não tem acesso a essa sessão
                 */
                if (this.account.perfilAcesso_Id == Role.Admin || (this.account.perfilAcesso_Id == Role.Master && res.perfilAcesso_Id != Role.Admin)) {
                    this.tableLinks = [
                        { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
                        { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                        { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
                    ];
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
    }
    ngOnInit(): void {
    }
    
    create = (userService: UsuarioService = this.userService): void => {
        userService.setObject(new Usuario);
    }

    canMenu() {
        return `(${this.account.perfilAcesso_Id} == ${Role.Admin}) || (${this.account.perfilAcesso_Id} == ${Role.Master} && item.perfilAcesso_Id != ${Role.Admin})` as unknown as boolean;
    }

}
