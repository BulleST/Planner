import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Investimento } from 'src/app/models/investimento.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { PlannerService } from 'src/app/services/planner.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-investimento',
    templateUrl: './form-investimento.component.html',
    styleUrls: ['./form-investimento.component.css']
})
export class FormInvestimentoComponent implements OnDestroy {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoInvestimento = new PlanejamentoInvestimento;
    erro: any[] = [];
    loading = false;

    planner: Planejamento = new Planejamento;
    investimentos: Investimento[] = [];
    loadingInvestimentos = true;

    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;

    selectedRisco?: TipoRisco;
    tipoRiscos: TipoRisco[] = [];
    loadingRiscos = true;

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private setupService: CarteiraSetupService,
        private investimentoService: InvestimentoService,
        private toastr: ToastrService,
        private crypto: Crypto,
        private activatedRoute: ActivatedRoute,
        private dropdown: DropdownService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        this.objeto.investimento = undefined as unknown as Investimento;
        
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var objeto = this.plannerService.objeto.subscribe(planner => {
            if (planner.id == 0) {
                planner = this.getPlanner();
            }
            this.planner = planner;
            this.objeto.planejamento_Id = this.planner.id;
        });
        this.subscription.push(objeto);

        var tipoRisco = this.dropdown.tipoRisco.subscribe(res => this.tipoRiscos = res);
        this.subscription.push(tipoRisco);
        lastValueFrom(this.dropdown.getRisco())
            .then(res => this.tipoRiscos = res)
            .finally(() => this.loadingRiscos = false);

        var list = this.investimentoService.list.subscribe(res => this.setInvestimentos());
        this.subscription.push(list);
        
        lastValueFrom(this.investimentoService.getAll())
            .then(res => this.setInvestimentos())
            .finally(() => this.loadingInvestimentos = false);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

  
    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    setInvestimentos() {
        this.loadingInvestimentos = true;
        var investimentosExistentes = this.planner.planejamentoInvestimento.map(x => x.investimento_Id)
        this.investimentos = this.investimentoService.list.value;
        if(this.selectedRisco) {
            this.investimentos = this.investimentos.filter(x => x.tipoRisco_Id == this.selectedRisco?.id)
        }
        this.investimentos = this.investimentos.filter(x => !investimentosExistentes.includes(x.id))      
        this.investimentos = this.investimentos.sort((x, y) => {
            if (x.tipoRisco_Id > y.tipoRisco_Id) return 1;
            else if (x.tipoRisco_Id < y.tipoRisco_Id)  return -1;
           
            // Else go to the 2nd item
            if (x.descricao.toLowerCase() < y.descricao.toLowerCase()) return -1;
            else if (x.descricao.toLowerCase() > y.descricao.toLowerCase()) return 1;
            else return 0;  // nothing to split them
        });

        this.objeto.investimento = undefined as unknown as Investimento;
        this.objeto.investimento_Id = undefined as unknown as number;
        this.loadingInvestimentos = false;
    }


    send(model: NgForm) {
        this.loading = true;
        this.erro = [];

        this.objeto.investimento_Id = this.objeto.investimento.id;
        this.objeto.planejamento_Id = this.planner.id;
        this.objeto.rentabilidadeLiquida = this.objeto.rentabilidade;
        // this.objeto.planoAcao = this.objeto.montanteAtual;
        // this.objeto.sugerido = this.objeto.planoAcao;
        
        let jaExiste = this.planner.planejamentoInvestimento.find(x => x.investimento_Id == this.objeto.investimento_Id)
        if (jaExiste) {
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

    getPlanner(): Planejamento {
        let e = localStorage.getItem('planejamento');
        let planner = this.crypto.decrypt(e);
        return planner;
    }
}
