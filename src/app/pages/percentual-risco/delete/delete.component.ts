import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { PercentualRisco } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PercentualRiscoService } from 'src/app/services/percentual-risco.service';
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
    objeto: PercentualRisco = new PercentualRisco;
    erro: any[] = [];
    url = '';
    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private riscoService: PercentualRiscoService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        activatedRoute.params.subscribe(p => {
            if (p['percentual_id']) {
                this.objeto.id = this.crypto.decrypt(p['percentual_id']);
            } else {
                this.voltar();
            }
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.percentualRisco.find(x => x.id == this.objeto.id) as PercentualRisco;
        } else {
            this.riscoService.get(this.objeto.id).subscribe({
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

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];

        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.riscoService.delete_To_Empresa_List(this.objeto.id);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }

            this.riscoService.delete(this.objeto.id).subscribe({
                next: async res => {
                    await lastValueFrom(this.riscoService.getList())
                    this.voltar();
                    this.riscoService.setObject(new PercentualRisco);
                },
                error: err => {
                    this.loading = false;
                }
            });
        }
    }

}
