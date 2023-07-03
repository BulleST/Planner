import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Investimento } from 'src/app/models/investimento.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { PlannerService } from 'src/app/services/planner.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-investimento',
    templateUrl: './form-investimento.component.html',
    styleUrls: ['./form-investimento.component.css']
})
export class FormInvestimentoComponent implements OnDestroy, AfterViewInit {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: PlanejamentoInvestimento = new PlanejamentoInvestimento;
    erro: any[] = [];
    loading = false;

    planner: Planejamento = new Planejamento;
    investimentos: Investimento[] = [];
    loadingInvestimentos = true;
    aliquota = '';
    subscription: Subscription[] = [];

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private setupService: CarteiraSetupService,
        private investimentoService: InvestimentoService,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) {
        this.objeto.investimento = undefined as unknown as Investimento;
        
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var i = 0;
        var objeto = this.plannerService.objeto.subscribe(planner => {
            if (planner.id == 0) {
                planner = this.getPlanner();
            }
            this.planner = planner;
            this.objeto.planejamento_Id = this.planner.id;
            console.log('planner ' + i++, planner)
        });
        this.subscription.push(objeto);

    }

    ngAfterViewInit(): void {
        var list = this.investimentoService.list.subscribe(res => this.setInvestimentos(res));
        this.subscription.push(list);
        lastValueFrom(this.investimentoService.getAll())
            .then(res => this.setInvestimentos(res))
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
        this.modal.voltar();
    }

    setInvestimentos(list: Investimento[]) {
        this.loadingInvestimentos = true;
        var investimentosExistentes = this.planner.planejamentoInvestimento.map(x => x.investimento_Id)
        console.log('investimentosExistentes', investimentosExistentes)
        console.log('list', list)
        this.investimentos = list.filter(x => !investimentosExistentes.includes(x.id))
        console.log('investimentos', this.investimentos)
        console.log('planner', this.planner)
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
        this.objeto.planoAcao = this.objeto.montanteAtual;
        this.objeto.sugerido = this.objeto.planoAcao;
        
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
