import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
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
    objeto: CarteiraSetup = new CarteiraSetup;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    url = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private setupService: CarteiraSetupService,
        private setupRelService: CarteiraProdutoRelService,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');

        activatedRoute.params.subscribe(p => {
            if (p['setup_id']) {
                this.objeto.id = this.crypto.decrypt(p['setup_id']);
            } else {
                this.voltar();
            }
        });
        
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.carteiraSetup.find(x => x.id == this.objeto.id) as CarteiraSetup;
        } else {
            this.setupService.get(this.objeto.id).subscribe({
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

    resetForm() {
        this.objeto = new CarteiraSetup
        this.setupService.setObject(new CarteiraSetup);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.setupService.edit_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            this.setupService.edit(this.objeto).subscribe({
                next: async (res) => {
                    await lastValueFrom(this.setupService.getList());
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