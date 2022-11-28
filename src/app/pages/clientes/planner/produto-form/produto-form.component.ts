import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
import { Produto } from 'src/app/models/produto.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { DropdownService } from 'src/app/services/dropdown.service';
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
export class ProdutoFormComponent implements OnInit {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoProduto = new PlanejamentoProduto;
    erro: any[] = [];
    loading = false;

    carteirasSetup: CarteiraSetup[] = [];
    loadingCarteiraSetup = true;
    produtos: Produto[] = [];
    loadingProdutos = true;
    tipoRiscos: TipoRisco[] = [];
    loadingRiscos = true;

    produto?: Produto;
    selectedRisco?: TipoRisco;
    planner: Planejamento = new Planejamento;
    
    aliquota = '';

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private alertService: AlertService,
        private produtoService: ProdutoService,
        private setup: CarteiraSetupService,
        private dropdown: DropdownService,
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

        this.dropdown.getRisco().subscribe({
            next: (res) => {
                this.tipoRiscos = res;
                this.loadingRiscos = false;
            }, 
            error: (err ) => {
                this.loadingRiscos = false;
            }
        })

        this.produtoService.list.subscribe(res => {
            this.setProdutos();
        })
        this.produtoService.getList().subscribe({
            next: (res) => {
                this.setProdutos();
                this.loadingProdutos = false
            },
            error: (erro) => {
                this.loadingProdutos = false
            }
        })
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar();
    }

    setProdutos() {
        this.loadingProdutos = true;
        this.produtos = this.produtoService.list.value;
        if(this.selectedRisco) {
            this.produtos = this.produtoService.list.value
            .filter(x => x.tipoRisco_Id == this.selectedRisco?.id)
        } 
        this.objeto.produtoTributacaoRel = undefined as unknown as ProdutoTributacaoRel;
        this.objeto.produtoTributacaoRel_Id = 0;
        this.produto = undefined;
        this.aliquota = '';
        this.loadingProdutos = false;
    }

    produtoChange() {
        this.objeto.produtoTributacaoRel_Id = 0;
        this.objeto.produtoTributacaoRel = undefined as unknown as ProdutoTributacaoRel;
        this.aliquota = '';
    }


    tributacaoChange(produtoTributacaoRel: ProdutoTributacaoRel) {
        let rels = this.planner.planejamentoProduto.map(x => x.produtoTributacaoRel)
        .find(x => x.produto_Id == produtoTributacaoRel.produto_Id && x.tributacao_Id == produtoTributacaoRel.tributacao_Id)

        if (rels) {
            this.objeto.produtoTributacaoRel_Id = 0;
            this.objeto.produtoTributacaoRel = undefined as unknown as ProdutoTributacaoRel;
            this.aliquota = '';
            this.produto = undefined;
            this.alertService.error('Você não pode inserir essa tributação e produto, pois já estão cadastrados.', { keepAfterRouteChange: false, })
        } else {
            this.objeto.produtoTributacaoRel_Id = produtoTributacaoRel?.id ?? 0;
            let produto: Produto = Object.assign({}, this.produto)
            produto.produtoTributacaoRel = [];
            this.objeto.produtoTributacaoRel.produto = produto;
            this.aliquota = this.objeto.produtoTributacaoRel?.tributacao?.aliquota.toString() ?? '';
        }


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
