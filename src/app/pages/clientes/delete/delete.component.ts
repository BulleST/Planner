import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
    faTimes = faTimes;
    modalOpen = false;
    erro: any[] = [];
    loading = false;
    objeto: Cliente = new Cliente;
    url = '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.activatedRoute.params.subscribe(res => {
            if (res['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(res['cliente_id']);
            } else {
                this.voltar();
            }
        });
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.cliente.find(x => x.id == this.objeto.id) as Cliente;
        } 
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar();
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

            this.clienteService.delete(this.objeto.id).subscribe({
                next: async res => {
                    await lastValueFrom(this.clienteService.getList())
                    this.voltar();
                    this.clienteService.setObject(new Cliente);
                },
                error: err => {
                    this.loading = false;
                }
            });
        }

    }
}
