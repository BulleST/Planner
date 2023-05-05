import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: Cliente = new Cliente;
    erro: any[] = [];
    loading = false;
    url = '';
    subscription: Subscription[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
    ) {


        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        activatedRoute.params.subscribe(p => {
            if (p['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(p['cliente_id']);
            } else {
                this.voltar();
            }
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.object.cliente.find(x => x.id == this.objeto.id) as Cliente;
        } else {
            lastValueFrom(this.clienteService.get(this.objeto.id))
                .then(res => this.objeto = res)
                .catch(res => this.voltar())
                .finally(() => this.loading = false);
        }
        
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
    }


    resetForm() {
        this.objeto = new Cliente;
    }

    voltar() {
        this.modal.voltar();
    }

    send(model: Cliente) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.clienteService.edit_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            lastValueFrom(this.clienteService.edit(model))
                .then((res) => {
                    lastValueFrom(this.clienteService.getList());
                    this.modal.voltar();
                })
                .catch(res => {
                    this.erro.push(getError(res));
                })
                .finally(() => this.loading = false);
        }
    }
}