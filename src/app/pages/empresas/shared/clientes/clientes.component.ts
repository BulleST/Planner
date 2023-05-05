import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faEllipsisV, faFilter, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Cliente, clienteColumns } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnDestroy {
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faUsers = faUsers;
    faFilter = faFilter;
    faTimes = faTimes;

    loading = false;
    columns = clienteColumns;
    objeto: Empresa = new Empresa;
    tableLinks: MenuTableLink[] = [];
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private table: Table,
    ) {
        var empresa = this.empresaService.empresa.subscribe(res => this.objeto = res);
        this.subscription.push(empresa);

        var url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (!url.includes('empresas/editar')) {
            this.columns = this.columns.filter(x => x.field != 'ativo');
        }

        var selected = this.table.selected.subscribe(res => {
            this.tableLinks = [];
            if (res) { // se tiver linha selecionada
                this.tableLinks.push({ label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] });
                if (!res.registroNaoSalvo) {
                    this.tableLinks.push({ label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [(res.ativo ? 'desabilitar' : 'habilitar')], paramsFieldName: ['id'] });
                } else {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] })
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    next() {
        this.router.navigate(['..', 'produtos'], { relativeTo: this.activatedRoute })
    }

    previous() {
        this.router.navigate(['..', 'usuarios'], { relativeTo: this.activatedRoute })
    }

    create = (clienteService: ClienteService = this.clienteService): void => {
        clienteService.setObject(new Cliente);
    }
}
