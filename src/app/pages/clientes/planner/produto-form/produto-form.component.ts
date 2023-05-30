import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
// import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
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
export class ProdutoFormComponent implements OnDestroy {
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
    subscription: Subscription[] = [];

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private produtoService: ProdutoService,
        private setupService: CarteiraSetupService,
        private dropdown: DropdownService,
    ) {

       
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var objeto = this.plannerService.objeto.subscribe(planner => this.planner = planner);
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
        this.produtos = this.produtoService.list.value;
        if(this.selectedRisco) {
            this.produtos = this.produtoService.list.value
            .filter(x => x.tipoRisco_Id == this.selectedRisco?.id)
        } 
        this.produto = undefined;
        this.aliquota = '';
        this.loadingProdutos = false;
    }

    produtoChange() {
        this.aliquota = '';
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
