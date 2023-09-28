import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { CarteiraProdutoRel } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { CarteiraSetupService } from 'src/app/services/setup.service';
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
    faWallet = faWallet;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: CarteiraSetup = new CarteiraSetup;
    erro: any[] = [];
    loading = false;
    url = '';
    subscription: Subscription[] = [];
    clearData = false;
    routerBack: string[] = ['../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private setupService: CarteiraSetupService,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
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
        this.objeto.carteiraProdutoRel.push({
            id: 0,
            carteiraSetup_Id: 0,
            percentual: 0,
            produto_Id: 61,
            produto: {id: 61, descricao: 'Conta Corrente', tipoRisco_Id: 1, tipoRisco: {id: 1, nome: 'Baixíssimo'}, tipoAtivo_Id: 1, tipoLiquidez_Id: 0} as unknown as Produto,
        })
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    resetForm() {
        var contaCorrente = this.objeto.carteiraProdutoRel.find(x => x.produto_Id == 61) as CarteiraProdutoRel;
        this.objeto = new CarteiraSetup;
        this.objeto.carteiraProdutoRel = [contaCorrente];
        this.setupService.setObject(this.objeto);
        this.clearData = true;
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar')) {
            let result = this.setupService.add_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            lastValueFrom(this.setupService.create(this.objeto))
                .then((res) => {
                    // this.voltar();
                    lastValueFrom(this.setupService.getList());
                })
                .catch(res => {
                    this.erro.push(getError(res));
                })
                .finally(() => this.loading = false);
        }
    }
}