import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: Cliente = new Cliente;
    erro: any[] = [];
    loading = false;
    url = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
    ) {

        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        activatedRoute.params.subscribe(p => {
            if (p['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(p['cliente_id']);
            } else {
                this.voltar();
            }
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.cliente.find(x => x.id == this.objeto.id) as Cliente;
        } else {
            this.clienteService.get(this.objeto.id).subscribe({
                next: res => {
                    this.objeto = res;
                },
                error: err => {
                    this.voltar();
                },
            })
        }
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
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
            this.clienteService.edit(model).subscribe({
                next: async (res) => {
                    await lastValueFrom(this.clienteService.getList());
                    this.modal.voltar();
                },
                error: (error) => {
                    this.loading = false;
                },
                complete: () => { }
            });
        }
    }
}