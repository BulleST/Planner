import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    faTimes = faTimes;
    faWallet = faWallet;
    modalOpen = false;
    objeto: CarteiraRequest = new CarteiraRequest;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    produtos: Produto[] = [];
    carteirasSetup: CarteiraSetup[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private setupService: CarteiraSetupService,
        private setupRelService: CarteiraProdutoRelService,
        private produtoService: ProdutoService,
        private empresaService: EmpresaService,
    ) {
        

        this.setupService.getObject().subscribe(res => {
            this.objeto = res as CarteiraRequest;
            console.log(res)
        });
       
        activatedRoute.paramMap.subscribe(p => {
            var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
            if (urlArray.includes('empresas/cadastrar/')) {
                this.produtos = this.empresaService.object.produto;
                this.carteirasSetup = this.empresaService.object.carteiraSetup;
            } 
            else {

                this.setupService.getList().subscribe({
                    next: (res) => {
                        this.carteirasSetup = res;
                    }
                });

                this.produtoService.getList().subscribe({
                    next: (res) => {
                        this.produtos = res;
                        this.produtos.map(p => {
                            p.tributacao = p.produtoTributacaoRel.map(x => x.tributacao)
                            return p;
                        });
                    }
                });
            }
        })
    }

    ngOnInit(): void {}
    
    voltar() {
        this.modal.voltar();
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            // var result = this.setupRelService.add_To_Empresa_List(this.objeto);
            // if (result){
            //     this.toastr.success('Operação concluída');
            //     this.voltar();
            // }
        } 
        else {
            if (urlArray.includes('empresas/editar')) {
            }
            console.log(this.objeto)
            // this.setupService.create(this.objeto).subscribe({
            //     next: (res) => {

            //     },
            //     error: (err) => {

            //     },
            // })
            // Enviar para a API
        }

        this.loading = false;
    }
}