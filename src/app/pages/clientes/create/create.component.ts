import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnDestroy {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: Cliente = new Cliente;
    erro: any[] = [];
    loading = false;
    url = '';
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private clienteService: ClienteService,
        private crypto: Crypto,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        if (this.url.includes('empresas/editar')) {
            var params = activatedRoute.parent?.parent?.params.subscribe(p => {
                if (p['empresa_id']) {
                    this.objeto.empresa_Id = this.crypto.decrypt(p['empresa_id']);
                } else {
                    this.voltar();
                }
            });
            if (params)
                this.subscription.push(params)
        }

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

        
    }


    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    resetForm() {
        this.objeto = new Cliente;
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send(model: Cliente) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar')) {
            let result = this.clienteService.add_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }

            lastValueFrom(this.clienteService.create(model))
                .then(res => {
                    this.voltar();
                    lastValueFrom(this.clienteService.getList());
                })
                .catch(res => {
                    this.erro.push(getError(res));
                })
                .finally(() => this.loading = false);
        }
    }
}