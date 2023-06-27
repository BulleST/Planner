import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight, faChartPie, faChevronLeft, faPlus, faTimes, faTrash, faTrashAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PrincipaisObjetivos } from 'src/app/models/objetivos.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { Produto } from 'src/app/models/produto.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PlannerService } from 'src/app/services/planner.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { ModalOpen } from 'src/app/utils/modal-open';
import { lastValueFrom } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnDestroy {
    faTimes = faTimes;
    faWallet = faWallet;
    faChevronLeft = faChevronLeft;
    faTrash = faTrash;
    faArrowRight = faArrowRight;
    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faChartPie = faChartPie;

    modalOpen = false;
    planner: Planejamento = new Planejamento;
    erro: any[] = [];
    
    loading = false;
    loadingProduto = false;

    carteirasSetup: CarteiraSetup[] = [];
    loadingCarteiraSetup = true;

    estadoCivil: EstadoCivil[] = [];
    loadingEstadoCivil = true;

    perfilInvestidor: PerfilInvestidor[] = [];
    loadingPerfilInvestidor = true;

    isEditPage: boolean = false;

    chartCapitalSeguradoData: any;
    chartCapitalSeguradoOptions: any;
    @ViewChild('chartCapitalSegurado') private chartCapitalSegurado;
    mobile: ScreenWidth = ScreenWidth.lg;

    formIsValid = false;
    @ViewChild('form') form: NgForm;

    somaProdutos = {
        somaPercentual: 0,
        somaPlanoAcao: 0,
        somaSugerido: 0,
    }

    somaInvestimentos = {
        somaPlanoAcao: 0,
        somaSugerido: 0,
    }

    // se o usuario alterou a carteira setup, não pode adicionar um produto 
    // fora da carteira selecionada antes de salvar e calcular os valores
    // dessa carteira pela primeira vez
    carteiraSetupInalterada = new CarteiraSetup;
    mudouCarteiraSetup = false;
    // hasProdutosLoaded = false; // Botão "Carregar produtos" foi clicado?

    clienteIdEncrypted = '';
    subscription: Subscription[] = [];

    dataNascimentoMin = '';
    dataNascimentoMax = '';
    // dataNascimento = new FormControl('', Validators.required);

    @ViewChild('dataNascimento') dataNascimento?: NgModel

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private isMobile: IsMobile,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private dropdown: DropdownService,
        private setup: CarteiraSetupService,
        private crypto: Crypto,
    ) {

        var dataNascimentoMax = new Date();
        dataNascimentoMax.setFullYear(dataNascimentoMax.getFullYear() + 100);
        this.dataNascimentoMax = dataNascimentoMax.toJSON().substring(0, 10);
        
        var dataNascimentoMin = new Date();
        dataNascimentoMin.setFullYear(dataNascimentoMin.getFullYear() - 100);
        this.dataNascimentoMin = dataNascimentoMin.toJSON().substring(0, 10);

        var get = this.isMobile.get().subscribe(res => this.mobile = res);

        var params = this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['cliente_id'];
            // this.hasProdutosLoaded = this.isEditPage;
            if (this.isEditPage) {
                this.loading = true;
                this.clienteIdEncrypted = item['cliente_id']
                this.planner.cliente_Id = this.crypto.decrypt(item['cliente_id'])
                lastValueFrom(this.plannerService.getByClienteId(this.planner.cliente_Id))
                    .then(res => {
                        res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                        res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                        res.principaisObjetivos = res.principaisObjetivos ? res.principaisObjetivos : [];
                        this.planner = res;
                        this.carteiraSetupInalterada = res.carteiraSetup;
                        // this.hasProdutosLoaded = true;
                        this.validateDataNascimento();
                        
                        var getObject = this.plannerService.objeto.subscribe(res => {
                            this.planner = res;
                            this.calculaPercentualProdutos();
                            this.calculaPercentualInvestimentos();
                            this.formIsValid = this.validaForm(this.form);
                        });
                        this.subscription.push(getObject);

                    })
                    .catch(res => {
                        this.voltar();
                    })
                    .finally(() => this.loading = false);

            } else {
                this.plannerService.getObject();
                var getObject = this.plannerService.objeto.subscribe(res => {
                    this.planner = res;
                    this.calculaPercentualInvestimentos();
                    this.calculaPercentualProdutos();
                    this.formIsValid = this.validaForm(this.form);
                })
                this.subscription.push(getObject);
            }
        });

        var empresa_Id = this.planner.cliente.empresa_Id ?? this.planner.account.empresa_Id;
        var list = this.setup.list.subscribe(res => {
            this.carteirasSetup = res.sort((x, y) => Number(y.ativo) - Number(x.ativo))
        });
        
        lastValueFrom(this.setup.getList(empresa_Id))
            .finally(() => this.loadingCarteiraSetup = false);

        var estadoCivil = this.dropdown.estadoCivil.subscribe(res => this.estadoCivil = res);
        lastValueFrom(this.dropdown.getEstadoCivil())
            .then(res => this.estadoCivil = res)
            .finally(() => this.loadingEstadoCivil = false);

        var perfilInvestidor = this.dropdown.perfilInvestidor.subscribe(res => this.perfilInvestidor = res);
        lastValueFrom(this.dropdown.getPerfilInvestidor())
            .then(res => this.perfilInvestidor = res)
            .finally(() => this.loadingPerfilInvestidor = false);

        this.subscription.push(get);
        this.subscription.push(params);
        this.subscription.push(list);
        this.subscription.push(estadoCivil);
        this.subscription.push(perfilInvestidor);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    voltar() {
        this.modal.voltar();
    }
    resetForm() {
        this.plannerService.setObject(new Planejamento);
    }


    calcularICM() {
        if (!this.planner.cliente.altura || !this.planner.cliente.peso) {
            this.planner.cliente.imc = '' as unknown as number;
        } else {
            this.planner.cliente.imc = this.planner.cliente.peso / (Math.pow(this.planner.cliente.altura, 2))
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

    calculaPercentualInvestimentos() {
        if (this.planner.planejamentoInvestimento.length > 0 && this.planner.planejamentoAgregandoValor != undefined) {
            const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
            var montanteTotal = this.planner.planejamentoAgregandoValor.montante ?? 1;
            var somaPlanoAcao = 0;
            var somaSugerido = 0;

            // Ordena os produtos e deixa conta corrente por ultimo
            this.planner.planejamentoInvestimento = this.planner.planejamentoInvestimento.sort((x, y) => x.investimento.descricao.toLowerCase() > y.investimento.descricao.toLowerCase() ? 1 : -1);
            this.planner.planejamentoInvestimento.map(x => {
                somaPlanoAcao += x.planoAcao;
                somaSugerido += x.sugerido;
                
                return x;
            })
            this.somaInvestimentos.somaPlanoAcao = round(somaPlanoAcao, 2);
            this.somaInvestimentos.somaSugerido = round(somaSugerido, 2);
        }

    }

    calculaIdade() {
        if (this.planner.cliente.dataNascimento && this.planner.cliente.dataNascimento.toString().trim() != '') {
            var ageDifMs = Date.now() - new Date(new Date(this.planner.cliente.dataNascimento).toUTCString()).getTime();;
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            this.planner.cliente.idade = Math.abs(ageDate.getUTCFullYear() - 1970);
        } else {
            this.planner.cliente.idade = '' as unknown as number;
        }
    }

    carteiraSetupChange(model: NgModel) {
        if (model.value) {
            let carteiraSetup = this.carteirasSetup.find(x => x.id == model.value) as CarteiraSetup;
            this.planner.carteiraSetup = carteiraSetup;
        } else {
            this.planner.carteiraSetup = undefined as unknown as CarteiraSetup;
        }

        this.mudouCarteiraSetup = !(this.planner.carteiraSetup_Id == this.carteiraSetupInalterada.id);
        // this.hasProdutosLoaded = !this.mudouCarteiraSetup;
        console.log(this.mudouCarteiraSetup)
        this.saveData();

    }

    perfilInvestidorChange() {
        this.planner.cliente.perfilInvestidor = this.perfilInvestidor
            .find(x => x.id == this.planner.cliente.perfilInvestidor_Id) as PerfilInvestidor;
        this.saveData();
    }

    adicionarFLuxoPontual() {
        this.planner.planejamentoFluxosPontuais.push(new FluxosPontuais)
        this.saveData();
    }

    removerFluxoPontual(item: FluxosPontuais) {
        let index = this.planner.planejamentoFluxosPontuais.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoFluxosPontuais.splice(index, 1);
            this.saveData();
        }
    }

    adicionarObjetivo() {
        this.planner.principaisObjetivos.push(new PrincipaisObjetivos)
        this.saveData();
    }

    removerObjetivo(item: PrincipaisObjetivos) {
        let index = this.planner.principaisObjetivos.findIndex(x => x == item);
        if (index != -1) {
            this.planner.principaisObjetivos.splice(index, 1);
            this.saveData();
        }
    }

    removerInvestimento(item: PlanejamentoInvestimento) {
        let index = this.planner.planejamentoInvestimento.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoInvestimento.splice(index, 1);
            this.saveData();
        }
    }

    removerProduto(item: PlanejamentoProduto) {
        let index = this.planner.planejamentoProduto.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoProduto.splice(index, 1);
            this.saveData();
        }
    }

    arrowUp(value: number) {
        return arrowUp(value)
    }

    arrowDown(value: number, allowNegative: boolean = false) {
        return arrowDown(value, allowNegative)
    }

    saveData() {
        this.plannerService.setObject(this.planner);
    }

    validaForm(form: NgForm) {
        this.erro = [];
        if (form.touched && form.invalid) {
            this.erro.push('Campos inválidos!');
            this.toastr.error('Campos inválidos!');
            return false;
        }

        if (this.loading == true) {
            return false;
        }

        if (this.planner.planejamentoInvestimento.length == 0) {
            this.erro.push('Insira um ou mais investimentos no planner.');
            this.toastr.error('Insira um ou mais investimentos no planner.');
            return false;
        }
        if (this.planner.planejamentoProduto.length == 0) {
            this.erro.push('Insira um ou mais produtos no planner.');
            this.toastr.error('Insira um ou mais produtos no planner.');
            return false;
        }

        if (this.planner.planejamentoProduto.find(x => x.planoAcao < 0) != undefined) {
            this.erro.push('Plano de ação em produto não pode ser inferior a zero.');
            this.toastr.error('Plano de ação em produto não pode ser inferior a zero.');
            return false;
        }

        if (this.somaProdutos.somaPlanoAcao > this.planner.planejamentoAgregandoValor.montante || this.somaProdutos.somaPlanoAcao < this.planner.planejamentoAgregandoValor.montante) {
            this.erro.push('Soma de plano de ação em produtos deve ser igual ao montante');
            this.toastr.error('Soma de plano de ação em produtos deve ser igual ao montante');
            return false;
        }

        if (this.somaProdutos.somaPercentual > 100 || this.somaProdutos.somaPercentual < 0) {
            this.erro.push('Soma total do percentual em produtos deve ser 100%.');
            this.toastr.error('Soma total do percentual em produtos deve ser 100%.');
            return false;
        }


        return true;
    }

    validateDataNascimento() {
        var data = new Date(this.planner.cliente.dataNascimento)
        var dataNascimentoMin = new Date(this.dataNascimentoMin)
        var dataNascimentoMax = new Date(this.dataNascimentoMax)
        if (this.dataNascimento) {
            if (data > dataNascimentoMax) {
                this.dataNascimento.control.setErrors({
                    max: true
                })
            }
            else if (data < dataNascimentoMin) {
                this.dataNascimento.control.setErrors({
                    min: true
                })
    
            }
        }
    }

    carregarProdutos(form: NgForm) {
        if (!this.planner.cliente.empresa) {
            this.planner.cliente.empresa = new Empresa;
        }
        this.planner.cliente.empresa.id = 1;

        this.saveData();
        this.erro = [];
        if (form.invalid) {
            this.erro.push('Campos inválidos!');
            this.toastr.error('Campos inválidos!');
            this.loading = false;
            return;
        }
        lastValueFrom(this.plannerService.create(this.planner))
            .then(res => {
                this.plannerService.setObject(res);
                this.mudouCarteiraSetup = false;
                // this.hasProdutosLoaded = true;
                if (res.carteiraSetup) {
                    this.carteiraSetupInalterada = res.carteiraSetup
                }
            })
            .finally(() => {
                this.loading = false;

            });

    }

    send(form: NgForm) {
        this.planner.account_Id = 1;
        this.planner.cliente.empresa_Id = 1;
        if (!this.planner.cliente.empresa) {
            this.planner.cliente.empresa = new Empresa;
        }
        this.planner.cliente.empresa.id = 1;
        this.saveData();
        let valid = this.validaForm(form);
        if (!valid) {
            return;
        }
        lastValueFrom(this.plannerService.edit(this.planner))
            .finally(() => this.loading = false);
    }
}