import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Cliente } from 'src/app/models/cliente.model';
import { AccountService } from 'src/app/services/account.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy {
    faTimes = faTimes;
    modalOpen = false;
    erro: any[] = [];
    loading = false;
    objeto: Cliente = new Cliente;
    url = '';
    subscription: Subscription[] = [];
    account?: Account;

    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private accountService: AccountService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.account = this.accountService.accountValue;
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(res['cliente_id']);
                
                lastValueFrom(this.clienteService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        if (this.account?.perfilAcesso_Id != 3 || (this.account?.perfilAcesso_Id == 3 && this.account?.id == res.account_Id)) {
                            setTimeout(() => {
                                this.modal.setOpen(true);
                            }, 200);
                        } else {
                            this.voltar();
                        }
                    })
                    .catch(res => {
                        this.voltar();
                    });


            } else {
                this.voltar();
            }
        });
        this.subscription.push(params)
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.object.cliente.find(x => x.id == this.objeto.id) as Cliente;
        }
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }


    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send() {
        this.loading = true;
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.clienteService.delete_To_Empresa_List(this.objeto.id);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            lastValueFrom(this.clienteService.delete(this.objeto.id))
                .then(async res => {
                    if (this.url.includes('empresas/editar')) {
                         await lastValueFrom(this.empresaService.get(this.objeto.empresa_Id));
                    }
                    this.voltar();
                    lastValueFrom(this.clienteService.getList());
                    this.clienteService.setObject(new Cliente);
                })
                .catch(res => this.erro.push(getError(res)))
                .finally(() => this.loading = false);

        }

    }
}
