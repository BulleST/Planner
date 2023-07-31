import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { AccountService } from 'src/app/services/account.service';
import { PlannerService } from 'src/app/services/planner.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-ver-planner-readonly',
    templateUrl: './ver-planner-readonly.component.html',
    styleUrls: ['./ver-planner-readonly.component.css']
})
export class VerPlannerReadonlyComponent implements OnInit {
    faArrowRight = faArrowRight;
    faChevronLeft = faChevronLeft;
    planner: Planejamento = new Planejamento;

    somaProdutos = {
        somaPercentual: 0,
        somaPlanoAcao: 0,
        somaSugerido: 0,
    }

    somaInvestimentos = {
        somaPlanoAcao: 0,
        somaSugerido: 0,
        somaMontanteAtual: 0,
    }

    subscription: Subscription[] = [];
    account?: Account;
    loading = false;

    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private modal: ModalOpen,
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private plannerService: PlannerService,
        private accountService: AccountService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        
        this.planner.carteiraSetup = new CarteiraSetup;
        this.account = this.accountService.accountValue;
        var params = this.activatedRoute.params.subscribe(item => {
            console.log(item)
            if (item['cliente_id'] && item['backoffice_id']) {
                this.loading = true;
                this.planner.cliente_Id = this.crypto.decrypt(item['cliente_id'])
                var backoffice_id = this.crypto.decrypt(item['backoffice_id'])
                console.log(backoffice_id)
                if (backoffice_id != 3) {
                    this.voltar();
                    return
                } else {
                    lastValueFrom(this.plannerService.getByClienteId(this.planner.cliente_Id))
                        .then(res => {
                            res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                            res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                            res.principaisObjetivos = res.principaisObjetivos ? res.principaisObjetivos : [];
                            this.planner = res;
                            
                            var getObject = this.plannerService.objeto.subscribe(res => {
                                this.planner = res;
                                this.calculaPercentualProdutos();
                                this.calculaPercentualInvestimentos();
                            });
                            this.subscription.push(getObject);
    
                        })
                        .catch(res => {
                            this.voltar();
                        })
                        .finally(() => this.loading = false);
                }
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
     }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    calculaPercentualInvestimentos() {
        if (this.planner.planejamentoInvestimento.length > 0 && this.planner.planejamentoAgregandoValor != undefined) {
            const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
            var montanteTotal = this.planner.planejamentoAgregandoValor.montante ?? 1;
            var somaPlanoAcao = 0;
            var somaSugerido = 0;
            var somaMontanteAtual = 0;

            // Ordena os produtos e deixa conta corrente por ultimo
            this.planner.planejamentoInvestimento = this.planner.planejamentoInvestimento.sort((x, y) => x.investimento.descricao.toLowerCase() > y.investimento.descricao.toLowerCase() ? 1 : -1);
            this.planner.planejamentoInvestimento.map(x => {
                somaPlanoAcao += x.planoAcao;
                somaSugerido += x.sugerido;
                somaMontanteAtual += x.montanteAtual;
                
                return x;
            })
            this.somaInvestimentos.somaPlanoAcao = round(somaPlanoAcao, 2);
            this.somaInvestimentos.somaSugerido = round(somaSugerido, 2);
            this.somaInvestimentos.somaMontanteAtual = round(somaMontanteAtual, 2);
        }
    }

    calculaPercentualProdutos() {
        if (this.planner.planejamentoProduto.length > 0 && this.planner.planejamentoAgregandoValor != undefined) {
            const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
            var montanteTotal = this.planner.planejamentoAgregandoValor.montante ?? 1;
            var somaPercentual = 0;
            var somaPlanoAcao = 0;
            var somaSugerido = 0;

            // Ordena os produtos e deixa conta corrente por ultimo
            var list = this.planner.planejamentoProduto;
            list = list.sort((x, y) => x.produto.descricao.toLowerCase() > y.produto.descricao.toLowerCase() ? 1 : -1);
            var contaCorrenteIndex = list.findIndex(x => x.produto_Id == 61);
            var contaCorrente = list.splice(contaCorrenteIndex, 1);
            list.push(contaCorrente[0])

            // Calcula percentuais e calcula valor da sobra para conta corrente
            list = list.map(x => {
                var percentual = 0
                if (x.produto_Id == 61) {
                    var sobra = this.planner.planejamentoAgregandoValor.montante - somaPlanoAcao;
                    percentual =  sobra > 0 ? sobra / this.planner.planejamentoAgregandoValor.montante : 0; 
                    x.percentual = round(percentual * 100, 2);
                    x.planoAcao = sobra > 0 ? sobra : 0;
                    x.sugerido = x.sugerido;

                } else {
                    percentual = x.planoAcao / montanteTotal;
                    x.percentual = round(percentual * 100, 2);
                }
                somaPercentual += percentual;
                somaPlanoAcao += x.planoAcao;
                somaSugerido += x.sugerido;
                return x
            });
            this.somaProdutos.somaPercentual = round(somaPercentual * 100, 2);
            this.somaProdutos.somaPlanoAcao = round(somaPlanoAcao, 2);
            this.somaProdutos.somaSugerido = round(somaSugerido, 2);
            this.planner.planejamentoProduto = list;
            
        }

    }

}
