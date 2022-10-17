import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
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
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit, AfterViewInit {
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
        private setup: CarteiraSetupService,
    ) {

        this.plannerService.getObject().subscribe(async planner => {
            this.planner = planner;
        });
        this.setup.list.subscribe(res => this.carteirasSetup = res);
        this.setup.getList().subscribe({
            next: res => {
                this.carteirasSetup = res
                this.loadingCarteiraSetup = false;
            },
            error: err => {
                this.loadingCarteiraSetup = false;
            }
        });


        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngAfterViewInit(): void {
        if (this.planner.carteiraSetup) {
            this.setProdutos();
        }
    }

    voltar() {
        this.modal.voltar();
    }

    async setProdutos() {
        this.loadingProdutos = true;
        let produtosId: number[] = [];
        if (this.planner.carteiraSetup) {
            this.planner.carteiraSetup_Id = this.planner.carteiraSetup.id;
            produtosId = this.planner.carteiraSetup.carteiraProdutoRel.map(x => x.produtoTributacaoRel.produto_Id);
            let produtosResponse = await lastValueFrom(this.produtoService.getList());
            
            this.produtos = produtosResponse.filter(x => produtosId.includes(x.id)).map(p => {
                p.produtoTributacaoRel = this.planner.carteiraSetup.carteiraProdutoRel.map(x => x.produtoTributacaoRel)
                .filter(x => x.produto_Id == p.id)
                return p;
            });
            this.produtos.sort((x,y) => x.id - y.id);

        } else {
            this.produtos = [];
        } 
        this.loadingProdutos = false;
    }

    async carteiraSetupChange(carteiraSetup: any) {
        console.log(this.planner.carteiraSetup)
        if (carteiraSetup.value) {
            this.planner.carteiraSetup_Id = carteiraSetup.value.id;
        } else {
            this.planner.carteiraSetup_Id = 0;
        } 
        this.plannerService.setObject(this.planner);

        this.setProdutos();

    }

    tributacaoChange(produtoTributacaoRel: ProdutoTributacaoRel) {
        this.objeto.produtoTributacaoRel_Id = produtoTributacaoRel?.id ?? 0;
        this.aliquota = this.objeto.produtoTributacaoRel?.tributacao?.aliquota.toString() ?? '';
    }

  
    slickInit(e) {
        console.log('slick initialized');
      }
      
      breakpoint(e) {
        console.log('breakpoint');
      }
      
      afterChange(e) {
        console.log('afterChange');
      }
      
      beforeChange(e) {
        console.log('beforeChange');
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
