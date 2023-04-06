import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Investimento } from 'src/app/models/investimento.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { PlannerService } from 'src/app/services/planner.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-investimento-form',
  templateUrl: './investimento-form.component.html',
  styleUrls: ['./investimento-form.component.css']
})
export class InvestimentoFormComponent implements OnInit, OnDestroy {
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
        private toastr: ToastrService,
        ) {
        this.plannerService.getObject().subscribe(planner => {
            this.planner = planner;
        });
            
        this.setupService.list.subscribe(res => this.carteirasSetup = res);
        lastValueFrom(this.setupService.getList())
        .then(res => {
            this.carteirasSetup = res
        })
        .finally(() => {
            this.loadingCarteiraSetup = false;
        })

        lastValueFrom(this.investimentoService.getAll())
        .then(res => {
            this.investimentos = res
        })
        .finally(() => {
            this.loadingInvestimentos = false;
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

    ngOnDestroy(): void {
        this.modal.setOpen(false);
    }


    voltar() {
        this.modal.voltar();
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
        
        this.objeto.investimento = this.investimento;
        this.objeto.investimento_Id = this.investimento.id;
        this.objeto.planejamento_Id = this.planner.id;
        let jaExiste = this.planner.planejamentoInvestimento.find(x => x.investimento_Id == this.objeto.investimento_Id)
        if(jaExiste) {
            this.erro.push('Esse investimento já está inserido.')
            this.toastr.error('Esse investimento já está inserido.')
        } else {
            this.erro = [];
            this.planner.planejamentoInvestimento.push(this.objeto);
            this.plannerService.setObject(this.planner);
            this.voltar();
        }
        this.loading = false;
    }

}
