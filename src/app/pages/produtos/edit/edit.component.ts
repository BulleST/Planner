import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Produto, ProdutoRequest } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
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
    modalOpen = false;
    objeto: Produto = new Produto;
    erro: any[] = [];
    loading = false;
    url = '';
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

        var params = activatedRoute.params.subscribe(p => {
            if (p['produto_id']) {
                this.objeto.id = this.crypto.decrypt(p['produto_id']);
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.object.produto.find(x => x.id == this.objeto.id) as Produto;
        } else {

            lastValueFrom(this.produtoService.get(this.objeto.id))
                .then(res => this.objeto = res)
                .catch(res => this.voltar())

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

    send(model: ProdutoRequest) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.produtoService.edit_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            lastValueFrom(this.produtoService.edit(model))
                .then((res) => {
                    lastValueFrom(this.produtoService.getList());
                    this.voltar();
                })
                .catch(res => {
                    this.erro.push(getError(res));
                })
                .finally(() => this.loading = false);
        }
    }
}