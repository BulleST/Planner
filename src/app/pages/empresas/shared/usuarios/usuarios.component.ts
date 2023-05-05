import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
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
    selector: 'app-usuarios-create',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy {
    faUser = faUsers;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;

    objeto: Empresa = new Empresa;
    columns = userColumns;
    tableLinks: MenuTableLink[] = [];
    account = new Account;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        private accountService: AccountService,
        private userService: UsuarioService,
        private router: Router,
        private table: Table,
        private activatedRoute: ActivatedRoute,
    ) {
        var account = this.accountService.account.subscribe(res => this.account = res ?? new Account);
        this.subscription.push(account);

        var empresa = this.empresaService.empresa.subscribe(res => this.objeto = res);
        this.subscription.push(empresa);

        var url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (!url.includes('empresas/editar'))
            this.columns = this.columns.filter(x => x.field != 'ativo');

        var selected = this.table.selected.subscribe(res => {
            this.tableLinks = [];
            if (res) { // se tiver linha selecionada
                this.tableLinks.push({ label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] });
                if (!res.registroNaoSalvo) {
                    this.tableLinks.push({ label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [(res.ativo ? 'desabilitar' : 'habilitar')], paramsFieldName: ['id'] });
                    this.tableLinks.push({ label: 'Resetar senha', routePath: ['reset-password'], paramsFieldName: ['id'] });
                } else {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] })
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => {
            item.unsubscribe()
        });
    }

    next() {
        this.router.navigate(['..', 'clientes'], { relativeTo: this.activatedRoute })
    }

    previous() {
        this.router.navigate(['..', 'dados-cadastrais'], { relativeTo: this.activatedRoute })
    }

    create = (userService: UsuarioService = this.userService): void => {
        userService.setObject(new Usuario);
    }

    canMenu() {
        return `(${this.account.perfilAcesso_Id} == ${Role.Admin}) || (${this.account.perfilAcesso_Id} == ${Role.Master} && item.perfilAcesso_Id != ${Role.Admin})` as unknown as boolean;
    }

}
