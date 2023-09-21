import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
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
    url = '';
    objeto: Produto = new Produto;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private crypto: Crypto,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['produto_id']) 
                this.objeto.id = this.crypto.decrypt(res['produto_id']);
            else 
                this.voltar();
        });
        this.subscription.push(params);

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
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
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

            lastValueFrom(this.produtoService.delete(this.objeto.id))
                .then(res => {
                    lastValueFrom(this.produtoService.getList())
                    this.voltar();
                    this.produtoService.setObject(new Produto);
                })
                .catch(res => this.erro.push(getError(res)))
                .finally(() => this.loading = false);
        }
    }
}
