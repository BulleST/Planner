import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight, faChevronLeft, faPlus, faTimes, faTrash, faTrashAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PrincipaisObjetivos } from 'src/app/models/objetivos.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { Produto } from 'src/app/models/produto.model';
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
export class PlannerComponent implements OnInit, AfterViewInit {
    faTimes = faTimes;
    faWallet = faWallet;
    faChevronLeft = faChevronLeft;
    faTrash = faTrash;
    faArrowRight = faArrowRight;
    faPlus = faPlus;
    faTrashAlt = faTrashAlt;

    modalOpen = false;

    planner: Planejamento = new Planejamento;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;


    carteira = [
        { id: 0, tipo: 'Atual', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
        { id: 1, tipo: 'Sugerida', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
        { id: 2, tipo: 'Diferença', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
    ];

    carteirasSetup: CarteiraSetup[] = [];
    loadingCarteiraSetup = true;

    estadoCivil: EstadoCivil[] = [];
    loadingEstadoCivil = true;

    perfilInvestidor: PerfilInvestidor[] = [];
    loadingPerfilInvestidor = true;

    isEditPage: boolean = false;
    chartSize: object = {
        'chart-capital-segurado': {
            'width': '0',
            'height': '0',
        },
        'chart-patrimonio-idade': {
            'width': '0',
            'height': '0',
        },
    };

    chartPatrimonioIdadeData: any;
    chartPatrimonioIdadeOptions: any;
    @ViewChild('chartPatrimonioIdade') private chartPatrimonioIdade;

    chartCapitalSeguradoData: any;
    chartCapitalSeguradoOptions: any;
    @ViewChild('chartCapitalSegurado') private chartCapitalSegurado;
    mobile: ScreenWidth = ScreenWidth.lg;

    produtoHover?: Produto;

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private isMobile: IsMobile,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private dropdown: DropdownService,
        private setup: CarteiraSetupService,
        private produtoService: ProdutoService,
        private crypto: Crypto,
    ) {
        this.plannerService.getObject().subscribe(res => {
            this.planner = res;
        });

        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['planner_id'];

            console.log(item)
            console.log(this.planner)
            if (this.isEditPage) {
                this.planner.id = this.crypto.decrypt(item['planner_id'])
                console.log('oi')
                this.plannerService.get(this.planner.id).subscribe({
                    next: res => {
                        console.log('oi')
                        res.cliente.rg = res.cliente.rg.toString().padStart(9, '0') as unknown as number;
                        res.cliente.cpf = res.cliente.cpf.toString().padStart(11, '0') as unknown as number;
                        res.principaisObjetivos = res.principaisObjetivos ? res.principaisObjetivos : [];
                        console.log(res)
                        this.planner = res;
                        this.setChartPatrimonioIdade();
                    }
                });
            }
        });

        this.isMobile.get().subscribe(res => this.mobile = res);

        this.setup.list.subscribe(res => this.carteirasSetup = res);
        this.setup.getList().subscribe({
            next: res => {
                this.carteirasSetup = res
                this.loadingCarteiraSetup = false;
            },
            error: err => {
                this.loadingCarteiraSetup = false;
            }
        });

        this.dropdown.getEstadoCivil().subscribe({
            next: res => {
                this.estadoCivil = res;
                this.loadingEstadoCivil = false;
            },
            error: err => {
                this.loadingEstadoCivil = false;
            }
        });
        this.dropdown.estadoCivil.subscribe(res => this.estadoCivil = res);

        this.dropdown.getPerfilInvestidor().subscribe({
            next: res => {
                this.perfilInvestidor = res;
                this.loadingPerfilInvestidor = false;
            },
            error: err => {
                this.loadingPerfilInvestidor = false;
            }
        });

        this.dropdown.perfilInvestidor.subscribe(res => this.perfilInvestidor = res);
        this.setChartPatrimonioIdade();
        this.setChartCapitalSegurado();
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.setChartPatrimonioIdade();
        this.setChartCapitalSegurado();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setChartWidth('chart-capital-segurado');
        this.setChartWidth('chart-patrimonio-idade');
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

    carteiraSetupChange(carteiraSetup: any) {
        if (carteiraSetup.value) {
            this.planner.carteiraSetup_Id = carteiraSetup.value.id;
        } else {
            this.planner.carteiraSetup_Id = 0;
        }
        this.plannerService.setObject(this.planner);

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

    setChartPatrimonioIdade() {
        this.setChartWidth('chart-patrimonio-idade');
        this.planner.planejamentoGrafico.sort((x, y) => x.idade - y.idade)
        this.chartPatrimonioIdadeData = {
            labels: this.planner.planejamentoGrafico.map(x => x.idade),
            // labels: Array.from({length: 21}, (_, i) => i * 5),
            datasets: [
                {
                    type: 'line',
                    label: 'Planejado',
                    // data: Array.from({length: 21}, (_, i) => parseInt((Math.random() * (100 - 0) + 0).toString())),
                    data: this.planner.planejamentoGrafico.map(x => x.valorPlanejado),
                    backgroundColor: '#242424',
                },
                {
                    type: 'bar',
                    label: 'Realidade Atual',
                    // data: Array.from({length: 21}, (_, i) => parseInt((Math.random() * (100 - 0) + 0).toString())),
                    data: this.planner.planejamentoGrafico.map(x => x.valorAtual),
                    backgroundColor: '#2d7a95',
                },
            ]
        }

        this.chartPatrimonioIdadeOptions = {
            plugins: {
                title: {
                    display: true,
                    text: 'Planejado x Realidade Atual',
                    font: {
                        size: 20
                    },
                    color: Colors.primary
                },
                subtitle: {
                    display: false,
                    text: 'Planejado x Realidade Atual',
                    font: {
                        size: 22
                    },
                    color: Colors.grey
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                xAxes: {
                    min: 0,
                    max: 100,
                    suggestedMax: 100,
                }
            },
        };
    }

    setChartCapitalSegurado() {
        this.setChartWidth('chart-capital-segurado');

        this.chartCapitalSeguradoData = {
            labels: ['', '', '', '', '', '', ''],
            datasets: [
                {
                    type: 'line',
                    label: 'Renda Interrompida 0 anos antes',
                    data: [39, 52, 36, 47, 14, 55, 74],
                    backgroundColor: colors
                },
                {
                    type: 'bar',
                    label: 'Capital Segurado',
                    data: [74, 65, 87, 19, 25, 25, 25],
                    backgroundColor: colors
                },
                {
                    type: 'bar',
                    label: 'Planejado',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor: colors
                }
            ]
        }

        this.chartCapitalSeguradoOptions = {
            plugins: {
                title: {
                    display: true,
                    text: 'Capital Segurado x Evolução Patrimonial',
                    font: {
                        size: 20
                    },
                    color: Colors.primary,
                },
                legend: {
                    position: 'top'
                }
            },
        };
    }

    setChartWidth(containerId: string) {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let containerWidth = $('#' + containerId).width() ?? 0;
        let containerHeight = $('#' + containerId).height() ?? 0;
        let viewportWidth = 100 / windowWidth;
        let viewportHeight = 100 / windowHeight;
        this.chartSize[containerId]['width'] = (viewportWidth * containerWidth).toString() + 'vw';
        this.chartSize[containerId]['height'] = (viewportHeight * containerHeight).toString() + 'vh';
    }

    async adicionarProduto() {
        if (this.planner.carteiraSetup) {
            this.planner.planejamentoProduto = this.planner.carteiraSetup.carteiraProdutoRel.map(x => {
                let planP: PlanejamentoProduto = new PlanejamentoProduto;
                planP.planejamento_Id = this.planner.id;
                planP.produtoTributacaoRel = x.produtoTributacaoRel;
                planP.produtoTributacaoRel_Id = x.produtoTributacaoRel_Id;
                return planP;
            });
            this.planner.planejamentoProduto.sort((x, y) => x.produtoTributacaoRel?.produto_Id - y.produtoTributacaoRel?.produto_Id);
        } else {
            this.planner.planejamentoProduto = [];
        } 
        this.plannerService.setObject(this.planner);
    }

    adicionarFLuxoPontual() {
        this.planner.planejamentoFluxosPontuais.push(new FluxosPontuais)
    }

    removerFluxoPontual(item: FluxosPontuais) {
        let index = this.planner.planejamentoFluxosPontuais.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoFluxosPontuais.splice(index, 1);
        }
    }

    adicionarObjetivo() {
        this.planner.principaisObjetivos.push(new PrincipaisObjetivos)
    }

    removerObjetivo(item: PrincipaisObjetivos) {
        let index = this.planner.principaisObjetivos.findIndex(x => x == item);
        if (index != -1) {
            this.planner.principaisObjetivos.splice(index, 1);
        }
    }

    removerInvestimento(item: PlanejamentoInvestimento) {
        let index = this.planner.planejamentoInvestimento.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoInvestimento.splice(index, 1);
            this.plannerService.setObject(this.planner);
        }
    }

    removerProduto(item: PlanejamentoProduto) {
        let index = this.planner.planejamentoProduto.findIndex(x => x == item);
        if (index != -1) {
            this.planner.planejamentoProduto.splice(index, 1);
            this.plannerService.setObject(this.planner);
        }
    }

    arrowUp(value: number) {
        return arrowUp(value)
    }

    arrowDown(value: number, allowNegative: boolean = false) {
        return arrowDown(value, allowNegative)
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        this.erro = [];
        console.log(this.planner)
        if (this.isEditPage) {
            // this.plannerService.edit(this.planner).subscribe({
            //     next: res => {
            //         this.loading = false;
            //         this.voltar();
            //     },
            //     error: err => {
            //         this.loading = false;
            //     }
            // });
        } else {
            // this.plannerService.create(this.planner).subscribe({
            //     next: res => {
            //         this.loading = false;
            //         this.voltar();
            //     },
            //     error: err => {
            //         this.loading = false;
            //     }
            // });
        }
    }
}