import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
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
    url = '';
    objeto: Produto = new Produto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.activatedRoute.params.subscribe(res => {
            if (res['produto_id']) {
                this.objeto.id = this.crypto.decrypt(res['produto_id']);
            } else {
                this.voltar();
            }
        });
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.object.produto.find(x => x.id == this.objeto.id) as Produto;
            let podeExcluir = this.empresaService.object.carteiraSetup
                .map(x => x.carteiraProdutoRel)
                .flat()
                // .find(x => x.produtoTributacaoRel.produto.id == this.objeto.id);
                .find(x => x.produto.id == this.objeto.id);
            if (podeExcluir) {
                this.voltar();
                this.toastr.error('Você não pode excluir esse produto, pois ele está associado a um setup.')
            }


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
            let result = this.produtoService.delete_To_Empresa_List(this.objeto.id);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }

            this.produtoService.delete(this.objeto.id).subscribe({
                next: async res => {
                    await lastValueFrom(this.produtoService.getList())
                    this.voltar();
                    this.produtoService.setObject(new Produto);
                },
                error: err => {
                    this.loading = false;
                }
            });
        }

    }
}
