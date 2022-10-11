import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
import { Produto } from 'src/app/models/produto.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { PlannerService } from 'src/app/services/planner.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoProduto = new PlanejamentoProduto;
    erro: any[] = [];
    loading = false;

    carteirasSetup: CarteiraSetup[] = [];
    produtos: Produto[] = [];
    loadingProdutos = true;
    produto?: Produto;
    tributacaoRel?: Produto;
    produtoTributacaoRel: ProdutoTributacaoRel[] = [];
    loadingCarteiraSetup = true;
    planner: Planejamento = new Planejamento;
    aliquota = '';

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private alertService: AlertService,
        private produtoService: ProdutoService,
    ) {

        this.plannerService.getObject().subscribe(async planner => {
            this.planner = planner;
            
            if (!planner.carteiraSetup_Id) {
                this.voltar();
                this.alertService.warn('Selecione um setup para cadastrar um produto')
            } else {
                let produtosId = planner.carteiraSetup.carteiraProdutoRel.map(x => x.produtoTributacaoRel.produto_Id);
                // this.produtos = (await lastValueFrom(this.produtoService.getList())).filter(x => produtosId.includes(x.id))
                this.produtoService.getList().subscribe({
                    next: res => {
                        this.produtos = res.filter(x => produtosId.includes(x.id)).map(p => {
                            p.produtoTributacaoRel = planner.carteiraSetup.carteiraProdutoRel.map(x => x.produtoTributacaoRel)
                                .filter(x => x.produto_Id == p.id)
                                return p;
                            });

                        this.produtos.sort((x,y) => x.id - y.id);
                        this.loadingProdutos = false;
                    },
                    error: err => {
                        this.loadingProdutos = false;
                    }
                })
            }
        })

        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar();
    }

    tributacaoChange(produtoTributacaoRel: ProdutoTributacaoRel) {
        this.objeto.produtoTributacaoRel_Id = produtoTributacaoRel?.id ?? 0;
        this.aliquota = this.objeto.produtoTributacaoRel?.tributacao?.aliquota.toString() ?? '';
    }
    arrowUp(value: number) {
        return arrowUp(value)
    }
    arrowDown(value: number, allowNegative: boolean = false) {
        return arrowDown(value, allowNegative)
    }

    send(model: NgForm) {
        this.loading = true;
        this.erro = [];

        this.planner.planejamentoProduto.push(this.objeto);
        this.plannerService.setObject(this.planner);
        this.voltar();

        this.loading = false;
    }

}
