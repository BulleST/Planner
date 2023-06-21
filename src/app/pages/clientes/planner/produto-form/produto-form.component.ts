import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { Produto } from 'src/app/models/produto.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
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
export class ProdutoFormComponent implements OnDestroy {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoProduto = new PlanejamentoProduto;
    planner: Planejamento = new Planejamento;
    erro: any[] = [];
    loading = false;
    subscription: Subscription[] = [];

    carteirasSetup: CarteiraSetup[] = [];
    loadingCarteiraSetup = true;
    
    produtos: Produto[] = [];
    loadingProdutos = true;
    
    selectedRisco?: TipoRisco;
    tipoRiscos: TipoRisco[] = [];
    loadingRiscos = true;

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private produtoService: ProdutoService,
        private setupService: CarteiraSetupService,
        private dropdown: DropdownService,
    ) {
       
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var objeto = this.plannerService.objeto.subscribe(planner => {
            this.planner = planner;
            this.objeto.planejamento_Id = this.planner.id;
        });
        this.subscription.push(objeto);

        var list = this.setupService.list.subscribe(res => this.carteirasSetup = res);
        this.subscription.push(list);
        lastValueFrom(this.setupService.getList())
            .then(res => this.carteirasSetup = res)
            .finally(() => this.loadingCarteiraSetup = false);
       
        var tipoRisco = this.dropdown.tipoRisco.subscribe(res => this.tipoRiscos = res);
        this.subscription.push(tipoRisco);
        lastValueFrom(this.dropdown.getRisco())
            .then(res => this.tipoRiscos = res)
            .finally(() => this.loadingRiscos = false);

        var list = this.produtoService.list.subscribe(res => this.setProdutos());
        this.subscription.push(list);
        lastValueFrom(this.produtoService.getList())
            .then(res => this.setProdutos())
            .finally(() => this.loadingProdutos = false);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar();
    }

    setProdutos() {
        this.loadingProdutos = true;
        var produtosExistentes = this.planner.planejamentoProduto.map(x => x.produto_Id)
        this.produtos = this.produtoService.list.value;
        if(this.selectedRisco) {
            this.produtos = this.produtoService.list.value
            .filter(x => x.tipoRisco_Id == this.selectedRisco?.id)
        }
        this.produtos = this.produtos.filter(x => !produtosExistentes.includes(x.id))
        this.objeto.produto = undefined as unknown as Produto;
        this.objeto.produto_Id = undefined as unknown as number;
        this.loadingProdutos = false;
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
        this.objeto.rentabilidadeLiquida = 0;
        this.objeto.montanteAtual = 0;
        this.objeto.sugerido = 0;
        this.planner.planejamentoProduto.push(this.objeto);
        this.plannerService.setObject(this.planner);
        this.voltar();
        this.loading = false;
    }

}
