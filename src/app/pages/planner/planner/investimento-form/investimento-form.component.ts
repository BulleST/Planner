import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { InvestimentoTributacaoRel } from 'src/app/models/investimento-tributacao-rel.model';
import { Investimento } from 'src/app/models/investimento.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { PlannerService } from 'src/app/services/planner.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-investimento-form',
  templateUrl: './investimento-form.component.html',
  styleUrls: ['./investimento-form.component.css']
})
export class InvestimentoFormComponent implements OnInit {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoInvestimento = new PlanejamentoInvestimento;
    erro: any[] = [];
    loading = false;

    carteirasSetup: CarteiraSetup[] = []
    loadingCarteiraSetup = true;
    planner: Planejamento = new Planejamento;


    investimento: Investimento = undefined as unknown as Investimento;
    investimentos: Investimento[] = [];
    loadingInvestimentos = true;
    aliquota = '';

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private setupService: CarteiraSetupService,
        private investimentoService: InvestimentoService,
        ) {
        this.plannerService.getObject().subscribe(planner => {
            this.planner = planner;
        });
            
        this.setupService.list.subscribe(res => this.carteirasSetup = res);
        this.setupService.getList().subscribe(res => {
            this.carteirasSetup = res
            this.loadingCarteiraSetup = false;
        });
        this.investimentoService.getAll().subscribe({
            next: res => {
                this.investimentos = res;
                this.loadingInvestimentos = false;
            },
            error: err => {
                this.loadingInvestimentos = false;
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

    arrowUp(value: number) {
        console.log('value: ', value)
        return arrowUp(value)
    }
    arrowDown(value: number, allowNegative: boolean = false) {
        console.log('value: ', value)
        return arrowDown(value, allowNegative)
    }
    
    tributacaoChange(investimentoTributacaoRel: InvestimentoTributacaoRel) {
        this.objeto.investimentoTributacao_Id = investimentoTributacaoRel?.id ?? 0;
        this.aliquota = this.objeto.investimentoTributacaoRel?.tributacao?.aliquota.toString() ?? '';
    }

    send(model: NgForm) {
        this.loading = true;
        this.erro = [];

        this.planner.planejamentoInvestimento.push(this.objeto);
        this.plannerService.setObject(this.planner);
        this.voltar();

        this.loading = false;
    }

}
