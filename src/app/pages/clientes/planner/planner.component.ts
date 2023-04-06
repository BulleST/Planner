import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChartPie, faChevronLeft, faPlus, faTimes, faTrash, faTrashAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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
import { AccountService } from 'src/app/services/account.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PlannerService } from 'src/app/services/planner.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { colors, Colors } from 'src/app/utils/colors.enum';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
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

    produtoHover?: Produto;

    percentualTotalProduto = 0;
    planoAcaoTotalProduto = 0;
    sugeridoTotalProduto = 0;

    // se o usuario alterou a carteira setup, não pode adicionar um produto 
    // fora da carteira selecionada antes de salvar e calcular os valores
    // dessa carteira pela primeira vez
    carteiraSetupInalterada = new CarteiraSetup;
    mudouCarteiraSetup = false;

    clienteIdEncrypted = '';

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
        this.plannerService.getObject().subscribe(res => {
            this.planner = res;
            this.mudouCarteiraSetup = this.planner.id != 0;
            this.calculaPercentual();
        });


        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['cliente_id'];
            if (this.isEditPage) {
                this.loading = true;
                this.clienteIdEncrypted = item['cliente_id']
                this.planner.cliente_Id = this.crypto.decrypt(item['cliente_id'])
                this.plannerService.getByClienteId(this.planner.cliente_Id).subscribe({
                    next: res => {
                        res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                        res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                        res.principaisObjetivos = res.principaisObjetivos ? res.principaisObjetivos : [];
                        this.planner = res;
                        this.carteiraSetupInalterada = res.carteiraSetup;
                        this.loading = false;
                        this.mudouCarteiraSetup = false;
                    },
                    error: err => {
                        this.loading = false;
                        this.voltar();
                        // this.toastr.warning('Esse cliente não tem planejamento.')
                        // this.toastr.warning('Cadastre um novo planejamento para esse cliente.')
                    }
                });
            }
        });

        this.isMobile.get().subscribe(res => this.mobile = res);

        var empresa_Id = this.planner.cliente.empresa_Id ?? this.planner.account.empresa_Id;

        this.setup.list.subscribe(res => this.carteirasSetup = res);
        this.setup.getList(empresa_Id).subscribe({
            next: res => {
                this.carteirasSetup = res
                this.loadingCarteiraSetup = false;
            },
            error: err => {
                this.loadingCarteiraSetup = false;
            }
        });
        this.dropdown.estadoCivil.subscribe(res => this.estadoCivil = res);
        this.dropdown.getEstadoCivil().subscribe({
            next: res => {
                this.estadoCivil = res;
                this.loadingEstadoCivil = false;
            },
            error: err => {
                this.loadingEstadoCivil = false;
            }
        });
        this.dropdown.perfilInvestidor.subscribe(res => this.perfilInvestidor = res);
        this.dropdown.getPerfilInvestidor().subscribe({
            next: res => {
                this.perfilInvestidor = res;
                this.loadingPerfilInvestidor = false;
            },
            error: err => {
                this.loadingPerfilInvestidor = false;
            }
        });
    }

    ngOnInit(): void { }



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

    calculaPercentual() {
        if (this.planner.planejamentoProduto.length > 0) {
            this.planoAcaoTotalProduto = (this.planner.planejamentoProduto.map(x => x.planoAcao) ?? []).reduce((x, y) => x + y)
            this.sugeridoTotalProduto = (this.planner.planejamentoProduto.map(x => x.sugerido) ?? []).reduce((x, y) => x + y)
            this.planner.planejamentoProduto = this.planner.planejamentoProduto.map(x => {
                x.percentual = (x.planoAcao * 100) / this.sugeridoTotalProduto;
                return x
            });

            this.percentualTotalProduto = this.planner.planejamentoProduto.map(x => x.percentual).reduce((x, y) => x + y);
        } else {
            this.planoAcaoTotalProduto = 0;
            this.percentualTotalProduto = 0;
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
        if (this.planner.carteiraSetup_Id == this.carteiraSetupInalterada.id) {
            this.mudouCarteiraSetup = false;
        } else {
            this.mudouCarteiraSetup = true;
        }
        this.saveData();

    }

    perfilInvestidorChange() {
        this.planner.cliente.perfilInvestidor = this.perfilInvestidor
            .find(x => x.id == this.planner.cliente.perfilInvestidor_Id) as PerfilInvestidor;
        this.saveData();
    }

    async adicionarProdutoCarteira(form: NgForm) {
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
        this.plannerService.create(this.planner).subscribe({
            next: res => {
                this.loading = false;
                this.plannerService.setObject(res);
                this.mudouCarteiraSetup = true;
            },
            error: err => {
                this.loading = false;
            }
        });
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
        console.log(this.planner)
        this.plannerService.setObject(this.planner);
    }

    validaForm(form: NgForm) {
        this.erro = [];
        if (form.invalid) {
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
        }

        return true;
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
        this.plannerService.edit(this.planner).subscribe({
            next: res => {
                this.loading = false;
                this.plannerService.setObject(res);
            },
            error: err => {
                this.loading = false;
            }
        });
    }
}