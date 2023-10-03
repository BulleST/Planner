import { AfterViewInit, Component, EventEmitter, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChartPie, faChevronLeft, faPlus, faTimes, faTrash, faTrashAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PrincipaisObjetivos } from 'src/app/models/objetivos.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PlannerService } from 'src/app/services/planner.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';
import { lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { getError } from 'src/app/utils/error';
import { EmpresaService } from 'src/app/services/empresa.service';
import { InputNumberComponent } from 'src/app/shared/input-number/input-number.component';
import { validaCPF } from 'src/app/utils/validate-cpf';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnDestroy, AfterViewInit {
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

    formIsValid = false;
    @ViewChild('form') form: NgForm;

    somaProdutos = {
        somaPercentual: 0,
        somaPlanoAcao: 0,
        somaPlanoAcaoLiquido: 0,
        somaSugerido: 0,
        somaSugeridoLiquido: 0,
        diferencaPercentual: 0,
        diferencaPlanoAcao: 0,
        diferencaSugerido: 0,
    }

    somaInvestimentos = {
        somaMontanteAtual: 0,
        somaMontanteAtualLiquido: 0,
    }

    // se o usuario alterou a carteira setup, não pode adicionar um produto 
    // fora da carteira selecionada antes de salvar e calcular os valores
    // dessa carteira pela primeira vez
    carteiraSetupInalterada = new CarteiraSetup;
    mudouCarteiraSetup = false;

    clienteIdEncrypted = '';
    subscription: Subscription[] = [];

    dataNascimentoMin = '';
    dataNascimentoMax = '';
    // dataNascimento = new FormControl('', Validators.required);

    @ViewChild('dataNascimento') dataNascimento?: NgModel;

    account?: Account;
    listUsuarios: Usuario[] = [];
    loadingUsuarios = true;

    @ViewChild('rg') rg: NgModel;
    @ViewChild('cpf') cpf: NgModel;

    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    
    @ViewChild('receita') receita: InputNumberComponent;
    @ViewChild('despesa') despesa: InputNumberComponent;

    colsProdutos = {
        custosTaxas: true,
        rentabLiquida: true,
        rentabBruta: true,
        montanteSugerido: true,
        planoAcao: true,
        percentual: true,
    }

    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    constructor(
        private modal: ModalOpen,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private crypto: Crypto,
        private dropdown: DropdownService,
        private setup: CarteiraSetupService,
        private accountService: AccountService,
        private clienteService: ClienteService,
        private plannerService: PlannerService,
        private usuarioService: UsuarioService,
        private empresaService: EmpresaService,
        private currency: CurrencyPipe,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var data = new Date();
        this.dataNascimentoMax = data.toJSON().substring(0, 10);

        var dataNascimentoMin = data;
        dataNascimentoMin.setFullYear(dataNascimentoMin.getFullYear() - 100);
        this.dataNascimentoMin = dataNascimentoMin.toJSON().substring(0, 10);

        this.account = this.accountService.accountValue;

        lastValueFrom(this.dropdown.getEstadoCivil())
            .then(res => this.estadoCivil = res)
            .finally(() => this.loadingEstadoCivil = false);

        lastValueFrom(this.dropdown.getPerfilInvestidor())
            .then(res => this.perfilInvestidor = res)
            .finally(() => this.loadingPerfilInvestidor = false);

        var empresa_Id: number;
        if (this.account?.perfilAcesso_Id == 1) empresa_Id = this.empresaService.object.id;
        else empresa_Id = this.planner.account.empresa_Id;

        lastValueFrom(this.setup.getList(empresa_Id))
            .then(res => {
                if (this.planner.carteiraSetup_Id) {
                    this.planner.carteiraSetup = res.find(x => x.id == this.planner.carteiraSetup_Id) as CarteiraSetup;
                }
            })
            .finally(() => this.loadingCarteiraSetup = false);

        lastValueFrom(this.usuarioService.getList(empresa_Id))
            .finally(() => this.loadingUsuarios = false);

        var list = this.setup.list.subscribe(res =>
            this.carteirasSetup = res.sort((x, y) => {
                if (Number(y.ativo) < Number(x.ativo)) return -1
                else if (Number(y.ativo) > Number(x.ativo)) return 1
                if (x.nome < y.nome) return -1
                else if (x.nome > y.nome) return 1
                else return 0
        }));
        this.subscription.push(list);
        var usuarios = this.usuarioService.list.subscribe(res => this.listUsuarios = res
            .sort((x, y) => {
                if (Number(y.ativo) < Number(x.ativo)) return -1;
                else if (Number(y.ativo) > Number(x.ativo)) return 1;
                if (x.name < y.name) return -1;
                else if (x.name > y.name) return 1
                else return 0;
        }));
        this.subscription.push(usuarios);

        var estadoCivil = this.dropdown.estadoCivil.subscribe(res => this.estadoCivil = res);
        this.subscription.push(estadoCivil);
        var perfilInvestidor = this.dropdown.perfilInvestidor.subscribe(res => this.perfilInvestidor = res);
        this.subscription.push(perfilInvestidor);

    }

    ngAfterViewInit(): void {
        var params = this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['cliente_id'];
            if (this.isEditPage) {
                this.loading = true;
                this.clienteIdEncrypted = item['cliente_id']
                this.planner.cliente_Id = this.crypto.decrypt(item['cliente_id'])
                this.routerBack = ['../../'];
                lastValueFrom(this.plannerService.getByClienteId(this.planner.cliente_Id))
                    .then(res => {
                        this.loading = false;
                        if (this.account?.perfilAcesso_Id == 3 && res.account_Id != this.account.id){
                            console.log('voltar 1')
                            this.voltar();
                        }
                        res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                        res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                        res.principaisObjetivos = res.principaisObjetivos ? res.principaisObjetivos : [];
                        this.planner = res;
                        this.plannerService.planejamentoBackup.next(Object.assign({}, res));
                        this.carteiraSetupInalterada = res.carteiraSetup;
                        var empresa_Id: number;
                        if (this.account?.perfilAcesso_Id == 1) empresa_Id = this.empresaService.object.id;
                        else empresa_Id = this.planner.cliente.empresa_Id ?? this.planner.account.empresa_Id;

                        this.validateDataNascimento();
                        this.validaRG_CPF(this.rg, this.planner.cliente.rg);
                        this.validaRG_CPF(this.cpf, this.planner.cliente.cpf);

                        var getObject = this.plannerService.objeto.subscribe(res => {
                            this.planner = res;
                            this.calculaPercentualProdutos();
                            this.calculaPercentualInvestimentos();
                            this.formIsValid = this.validaForm(this.form);

                        });
                        this.subscription.push(getObject);

                    })
                    .catch(res => {
                        console.log('voltar 2', res)
                        this.voltar();
                    })
                    .finally(() => this.loading = false);

            } else {
                this.routerBack = ['../'];
                var plannerInitial = this.plannerService.getObject().value;

                if (plannerInitial.account_Id == 0) {
                    plannerInitial.account_Id = this.account?.id ?? 0;
                    plannerInitial.account = this.account as Account;
                    plannerInitial.cliente.account_Id = plannerInitial.account_Id;
                }

                var empresa_Id: number;
                if (this.account?.perfilAcesso_Id == 1) empresa_Id = this.empresaService.object.id;
                else empresa_Id = this.planner.account.empresa_Id;
                this.planner.cliente.empresa_Id = empresa_Id;

                var getObject = this.plannerService.objeto.subscribe(res => {
                    this.planner = res;
                    this.calculaPercentualInvestimentos();
                    this.calculaPercentualProdutos();
                    this.formIsValid = this.validaForm(this.form);
                })
                this.subscription.push(getObject);
                this.validaRG_CPF(this.rg, this.planner.cliente.rg);
                this.validaRG_CPF(this.cpf, this.planner.cliente.cpf);
            }
        });

        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        console.log('voltar 3')
        this.modal.voltar(this.routerBack, this.routeBackOptions);
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
            var somaSugerido_Liquido = 0;
            var somaPlanoAcao_Liquido = 0;

            // Ordena os produtos e deixa conta corrente por ultimo
            var list = this.planner.planejamentoProduto;
            list = list.sort((x, y) => {
                
                if (x.produto.tipoRisco_Id > y.produto.tipoRisco_Id) return -1;
                else if (x.produto.tipoRisco_Id < y.produto.tipoRisco_Id)  return 1;
               
                // Else go to the 2nd item
                if (x.produto.descricao.toLowerCase() < y.produto.descricao.toLowerCase()) return -1;
                else if (x.produto.descricao.toLowerCase() > y.produto.descricao.toLowerCase()) return 1;
                else return 0;  // nothing to split them
            });
            
            
            var contaCorrenteIndex = list.findIndex(x => x.produto_Id == 61);
            var contaCorrente = list.splice(contaCorrenteIndex, 1);
            list.push(contaCorrente[0])

            var maxDecimalLength = 2
            // Calcula percentuais e calcula valor da sobra para conta corrente
            list = list.map(x => {
                var decimalLength = 2;
                var percentual = 0;
                var multiplier = 1;

                if (x.produto_Id == 61) { // Se for conta corrente calcula a sobra
                    var sobra = montanteTotal - somaPlanoAcao;
                    x.sugerido = x.sugerido;
                    x.planoAcao = sobra > 0 ? sobra: 0;
                    if (sobra > 0) {
                        x.planoAcao = sobra;
                        var total: number[] | number = this.planner.planejamentoProduto.filter(x => x.produto_Id != 61).map(x => x.percentual);
                        total = total.length > 0 ? total.reduce((x, y) => x + y) : 0;
                        percentual = 100 - total;
                    } else {
                        x.planoAcao, percentual = 0
                    }
                    x.percentual = round(percentual, maxDecimalLength);
                    
                } else {
                    percentual = x.planoAcao / montanteTotal;
                    x.percentual = round(percentual * 100, decimalLength);
                    while (x.planoAcao != 0 && x.percentual == 0) {
                        x.percentual = round(percentual * multiplier, ++decimalLength);
                        maxDecimalLength = decimalLength > maxDecimalLength ? decimalLength : maxDecimalLength;
                    }

                    // Calcula rentabilidade líquida
                    var rentabilidadeLiquida = (x.rentabilidade * (100 - x.custosTaxas)) / 100;
                    x.rentabilidadeLiquida = round(rentabilidadeLiquida, 2);

                    var liquidoSugerido = (x.sugerido * rentabilidadeLiquida) / 100
                    x.valorLiquido_MontanteAtual = round(liquidoSugerido, 2);

                    var liquido_PlanoAcao = (x.planoAcao * rentabilidadeLiquida) / 100
                    x.valorLiquido_PlanoAcao = round(liquido_PlanoAcao, 2);
                }
                somaPercentual += x.percentual;
                somaPlanoAcao += x.planoAcao;
                somaSugerido += x.sugerido;
                somaPlanoAcao_Liquido += x.valorLiquido_PlanoAcao; 
                somaSugerido_Liquido += x.valorLiquido_MontanteAtual; 
                return x
            });


            this.somaProdutos.somaPercentual = round(somaPercentual, 2);
            this.somaProdutos.somaPlanoAcao = round(somaPlanoAcao, 2);
            this.somaProdutos.somaSugerido = round(somaSugerido, 2);

            this.somaProdutos.somaSugeridoLiquido = round(somaSugerido_Liquido, 2);
            this.somaProdutos.somaPlanoAcaoLiquido = round(somaPlanoAcao_Liquido, 2);

            this.somaProdutos.diferencaPercentual = round(100 - this.somaProdutos.somaPercentual, 2);
            this.somaProdutos.diferencaPlanoAcao = round(montanteTotal - this.somaProdutos.somaPlanoAcao, 2);
            this.somaProdutos.diferencaSugerido = round(montanteTotal - this.somaProdutos.somaSugerido, 2);
            
            setTimeout(() => { // espera atualizar html
                this.planner.planejamentoProduto = Object.assign([], list); // Força a mudança na model
                this.somaProdutos = Object.assign({}, this.somaProdutos) // Força a mudança na model
            }, 1000);
        }

    }

    calculaPercentualInvestimentos() {
        if (this.planner.planejamentoInvestimento.length > 0 && this.planner.planejamentoAgregandoValor != undefined) {
            const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
            var montanteTotal = this.planner.planejamentoAgregandoValor.montante ?? 1;
            var somaMontanteAtual = 0;
            var somaMontanteAtual_Liquido = 0;

           
            // Ordena os investimentos por risco
            var list = this.planner.planejamentoInvestimento;
            list = list.sort((x, y) => {
                if (x.investimento.tipoRisco_Id > y.investimento.tipoRisco_Id) return -1;
                else if (x.investimento.tipoRisco_Id < y.investimento.tipoRisco_Id)  return 1;
               
                // Else go to the 2nd item
                if (x.investimento.descricao.toLowerCase() < y.investimento.descricao.toLowerCase()) return -1;
                else if (x.investimento.descricao.toLowerCase() > y.investimento.descricao.toLowerCase()) return 1;
                else return 0;  // nothing to split them
            });
            
            list = list.map(x => {
                // Calcula rentabilidade líquida
                var rentabilidadeLiquida = (x.rentabilidade * (100 - x.custosTaxas)) / 100;
                var liquidoSugerido = (x.montanteAtual * rentabilidadeLiquida) / 100
                
                x.rentabilidadeLiquida = round(rentabilidadeLiquida, 2);
                x.valorLiquido_MontanteAtual = round(liquidoSugerido, 2);
                
                somaMontanteAtual += x.montanteAtual;
                somaMontanteAtual_Liquido += x.valorLiquido_MontanteAtual;

                return x;
            })
            this.somaInvestimentos.somaMontanteAtual = round(somaMontanteAtual, 2);
            this.somaInvestimentos.somaMontanteAtualLiquido = round(somaMontanteAtual_Liquido, 2);
            
            setTimeout(() => { // espera atualizar html
                this.planner.planejamentoInvestimento = Object.assign([], list); // Força a mudança na model
                this.somaInvestimentos = Object.assign({}, this.somaInvestimentos) // Força a mudança na model
            }, 1000);
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
        if (item.produto_Id != 61) {
            let index = this.planner.planejamentoProduto.findIndex(x => x == item);
            if (index != -1) {
                this.planner.planejamentoProduto.splice(index, 1);
                this.saveData();
            }
        }
    }

    saveData() {
        this.plannerService.setObject(this.planner);
    }

    validaRG_CPF(input: NgModel, doc: number) {
        if (!input) {
            return;
        }
        if (!doc || doc == 0) {
            input.control.setErrors({ required: true });
            return;
        }

        if (input.name == 'cpf') {
            var valid = validaCPF(doc)
            if (!valid) {
                input.control.setErrors({
                    invalid: true
                })
                return;
            }
        }
        lastValueFrom(this.clienteService.getByDoc(this.planner.cliente_Id, doc))
            .then(res => { 
                this.saveData();
            })
            .catch(res => {
                input.control.setErrors({
                    jaExiste: getError(res)
                });
            });

    }

    validaForm(form: NgForm) {
        this.erro = [];
        if (form.touched && form.invalid) {
            this.erro.push('Campos inválidos!');
            return false;
        }

        if (this.loading == true) {
            return false;
        }

        if (this.planner.planejamentoInvestimento.length == 0) {
            this.erro.push('Insira um ou mais investimentos no planner.');
            return false;
        }
        if (this.planner.planejamentoProduto.length == 0) {
            this.erro.push('Insira um ou mais produtos no planner.');
            return false;
        }

        if (this.planner.planejamentoProduto.find(x => x.planoAcao < 0) != undefined) {
            this.erro.push('Plano de ação em produto não pode ser inferior a zero.');
            return false;
        }

        if (this.somaProdutos.somaPlanoAcao > this.planner.planejamentoAgregandoValor.montante || this.somaProdutos.somaPlanoAcao < this.planner.planejamentoAgregandoValor.montante) {
            this.erro.push('Soma de plano de ação em produtos deve ser igual ao montante');
            return false;
        }

        if (this.planner.cliente.receita < this.planner.cliente.despesa) {
            this.erro.push('Receita deve ser maior que despesas');
            return false;
        }

        return true;
    }

    // Receita deve ser maior que despesa
    validaReceitaDespesa(input: NgModel) {
        if (this.planner.cliente.receita < this.planner.cliente.despesa) {
            if (input.name == 'despesa') {
                this.despesa.error = {message: 'Despesa não pode ser maior que receita.'};
            } else if (input.name == 'receita'){
                this.receita.error = {message: 'Receita não pode ser menor que despesa.'};
            }
        } else {
            this.receita.error = null;
            this.despesa.error = null;
            this.receita.validate();
            this.despesa.validate();
        }
        
        return input;
    }

    validateDataNascimento() {
        var data = new Date(this.planner.cliente.dataNascimento);
        var dataNascimentoMin = new Date(this.dataNascimentoMin);
        var dataNascimentoMax = new Date(this.dataNascimentoMax);

        if (this.dataNascimento) {
            if (data > dataNascimentoMax) {
                this.dataNascimento.control.setErrors({ max: true })
            }
            else if (data < dataNascimentoMin) {
                this.dataNascimento.control.setErrors({ min: true })

            }
        }
    }

    carregarProdutos(form: NgForm) {
        // Se não for edição qqr um salva
        // Se for edição apenas master/admin ou analista responvável pode salvar
        if (!this.isEditPage || (this.isEditPage && (this.account?.perfilAcesso_Id != 3 || this.account?.id == this.planner.account_Id))) {
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
                    this.clienteIdEncrypted = this.crypto.encrypt(res.cliente_Id) as string;
                    if (!this.isEditPage) {
                        this.router.navigate([this.clienteIdEncrypted], { relativeTo: this.activatedRoute });
                    }
                    res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                    res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                    this.plannerService.setObject(res);
                    this.mudouCarteiraSetup = false;
                    if (res.carteiraSetup) {
                        this.carteiraSetupInalterada = res.carteiraSetup
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        }

    }

    send(form: NgForm) {
        // Se for tela de cadastro isEditPage = false
        // Ou Se for tela de edição (isEditPage = true) E o usuário logado criou o planner
        // Ou se o usuário não criou o Planner mas é perfil Admin ou master
        // Ai sim ele pode editar o planner.

        this.saveData();
        let valid = this.validaForm(form);
        if (!valid) {
            this.toastr.error('Campos inválidos')
            return;
        }

        if (!this.isEditPage || ((this.isEditPage && this.account?.id == this.planner.account_Id) || this.account?.perfilAcesso_Id != 3)) {
            lastValueFrom(this.plannerService.edit(this.planner))
                .then(res => {
                    if (!this.isEditPage) {
                        this.router.navigate([this.clienteIdEncrypted], { relativeTo: this.activatedRoute });
                    }
                    res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                    res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                    this.plannerService.setObject(res);
                    this.mudouCarteiraSetup = false;
                    if (res.carteiraSetup) {
                        this.carteiraSetupInalterada = res.carteiraSetup
                    }
                })
                .finally(() => this.loading = false);
        }
    }

    formatReais(valor: number) {
        const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
        valor = round(valor, 2)
        var newValue = this.currency.transform(valor, 'BRL', 'R$', '1.2')
        return newValue;
    }

    formatPorcentagem(valor: number) {
        const round = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
        valor = round(valor, 2)
        var newValue = this.currency.transform(valor, 'BRL', '', '1.2') + '%'
        return newValue;
    }
    
}