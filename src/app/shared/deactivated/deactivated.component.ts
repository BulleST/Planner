import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Produto } from 'src/app/models/produto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-shared-deactivated',
    templateUrl: './deactivated.component.html',
    styleUrls: ['./deactivated.component.css'],
})
export class DeactivatedComponent implements OnChanges {
    faTimes = faTimes;
    @Input() objeto: any;
    @Input() service: any;
    @Input() isUser: boolean = false;

    erro: any[] = [];
    loading = false;
    url = '';
    account?: Account;
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.routeBackOptions = { relativeTo: this.activatedRoute };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.objeto.ativo = !this.objeto.dataDesativado;
        }
        if (changes['service']) {
            this.service = changes['service'].currentValue;
        }
        if (changes['isUser']) {
            this.isUser = changes['isUser'].currentValue;
            if (this.isUser == true) {
                this.account = this.accountService.accountValue;
            }
        }
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send() {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.service.delete_To_Empresa_List(this.objeto.id);
            if (result)
                this.voltar();
            this.loading = false;
        }
        else {
            var enabled = !!this.objeto.dataDesativado;
            // Enviar para a API
            lastValueFrom(this.service.deactivated(this.objeto.id, enabled))
                .then(async res => {
                    if (this.isUser && (res as Usuario).dataDesativado && (res as Usuario).email == this.account?.email) {
                        this.accountService.logout();
                    }
                    var list = await lastValueFrom(this.service.getList());
                    if (this.url.includes('empresas/editar')) {
                        var empresa = this.empresaService.object;
                        if (this.url.includes('usuarios'))
                            empresa.account = list as Usuario[];
                        else if (this.url.includes('clientes'))
                            empresa.cliente = list as Cliente[];
                        else if (this.url.includes('produtos'))
                            empresa.produto = list as Produto[];
                        else if (this.url.includes('setup'))
                            empresa.carteiraSetup = list as CarteiraSetup[];
                        this.empresaService.setObject(empresa, 'edit usuario');
                    }
                    this.voltar();
                    this.service.setObject({});
                })
                .finally(() => this.loading = false)
        }
    }
}
