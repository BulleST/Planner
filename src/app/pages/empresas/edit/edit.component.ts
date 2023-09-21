import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChevronLeft, faCity, faEllipsisV, faFilter, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy {
    faChevronLeft = faChevronLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    faUsers = faUsers;
    faFilter = faFilter;
    objeto: Empresa = new Empresa;
    erro: any[] = [];
    loading = false;
    index: number = 1;
    empresaSelectedId = 0
    account?: Account;
    empresas: Empresa[] = [];
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;
    
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private setupService: CarteiraSetupService,
        private userService: UsuarioService,
        private clienteService: ClienteService,
        private crypto: Crypto,
        private modal: ModalOpen,
        private accountService: AccountService,
        private table: Table,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        lastValueFrom(this.empresaService.getList()).then(res => this.empresas = res);

        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);

        this.empresaSelectedId = this.crypto.decrypt(activatedRoute.snapshot.paramMap.get('empresa_id'));
        
        var params = activatedRoute.params.subscribe(async p => {
            if (!p['empresa_id']) {
                this.voltar();
            } else {
                this.objeto.id = this.crypto.decrypt( p['empresa_id']);
                this.objeto = await lastValueFrom(this.empresaService.get(this.objeto.id));
                this.getEmpresaData();
            }
        });
        this.subscription.push(params);
    }


    ngOnDestroy(): void {
        this.empresaService.setObject(new Empresa, 'ngOnDestroy');
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

  
    voltar() {
        this.router.navigate(this.routerBack, { relativeTo: this.activatedRoute, preserveFragment: false, replaceUrl: true})
        this.modal.setOpen(false);
    }

    empresaChange(e) {
        var path = this.activatedRoute.children[this.activatedRoute.children.length - 1]?.routeConfig?.path ?? '';
        this.router.navigate(['empresas', 'editar', this.crypto.encrypt(this.objeto.id), path],
                             {skipLocationChange: true});
    }

    async getEmpresaData() {
        lastValueFrom(this.userService.getList(this.objeto.id)).then(res => {
            this.objeto.account = res;
            this.empresaService.setObject(this.objeto, 'getEmpresaData userService')
        });
        lastValueFrom(this.clienteService.getList(this.objeto.id)).then(res => {
            this.objeto.cliente = res as unknown as Cliente[];
            this.empresaService.setObject(this.objeto, 'getEmpresaData clienteService')
        });
        lastValueFrom(this.produtoService.getList(this.objeto.id)).then(res => {
            this.objeto.produto = res;
            this.empresaService.setObject(this.objeto, 'getEmpresaData produtoService')
        });
        lastValueFrom(this.setupService.getList(this.objeto.id)).then(res => {
            this.objeto.carteiraSetup = res;
            this.empresaService.setObject(this.objeto, 'getEmpresaData setupService')
        });
    }

}
