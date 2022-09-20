import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
import { Produto } from 'src/app/models/produto.model';
import { DropdownService } from 'src/app/services/dropdown.service';
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
    // modalOpen = false;
    objeto: CarteiraRequest = new CarteiraRequest;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    produtos: Produto[] = [];
    carteirasSetup: CarteiraSetup[] = [];
    urlArray = '';
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
        // this.modal.getOpen().subscribe(res => {
        //     this.modalOpen = res;
        // });

        this.urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.urlArray.includes('empresas/cadastrar')) {
            this.empresaService.empresaObject.subscribe(res => {
                this.carteirasSetup = res.carteiraSetup;
                this.produtos = res.produto;
            });
        } else {
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

        activatedRoute.paramMap.subscribe(p => {
            if (p.get('setup_id')) {
                this.objeto.id = this.crypto.decrypt(p.get('setup_id'));
                if (this.urlArray.includes('empresas/cadastrar')) {
                    let objeto = this.empresaService.object?.carteiraSetup.find(x => x.id == this.objeto.id);
                    if (!objeto) {
                        this.voltar();
                    }
                } else {
                    this.setupService.get(this.objeto.id).subscribe({
                        next: (res) => {
                            this.objeto.carteiraRiscoRel = res.carteiraRiscoRel;
                            this.objeto.carteiraProdutoRel = res.carteiraProdutoRel;
                            this.objeto.empresa_Id = res.empresa_Id;
                            this.objeto.nome = res.nome;
                        },
                        error: (err) => {
                            this.voltar()
                        },
                        complete: () => { },
                    })
                }
            }
        })
    }

    ngOnInit(): void {
    }

    voltar() {
        this.modal.voltar();
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        if (this.urlArray.includes('empresas/cadastrar')) {
            let result = this.setupRelService.add_To_Empresa_List(this.objeto);
            if (result)
                this.voltar();
        }
        else {
            if (this.urlArray.includes('empresas/editar')) {

            }
            // Enviar para a API
        }
        this.toastr.success('Operação concluída');
        this.loading = false;
    }
}