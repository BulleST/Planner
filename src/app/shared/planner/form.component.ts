import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowRight, faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { colors, Colors } from 'src/app/utils/colors.enum';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import * as $ from 'jquery';
import { PrincipaisObjetivos } from 'src/app/models/objetivos.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlannerService } from 'src/app/services/planner.service';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';

@Component({
    selector: 'app-form-planner',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormPlannerComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() planner: Planejamento = new Planejamento;
    @Input() loading: boolean = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    faTrash = faTrash;
    faArrowRight = faArrowRight;

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

    principaisObjetivos: PrincipaisObjetivos[] = [];

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;

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
    constructor(
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private dropdown: DropdownService,
        private setup: CarteiraSetupService,
        private plannerService: PlannerService,
        private isMobile: IsMobile,
    ) {
        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['cliente_id'];
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

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['planner']) {
            this.planner = changes['planner'].currentValue;
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;
    }
    ngAfterViewInit(): void {
        this.setChartPatrimonioIdade();
        this.setChartCapitalSegurado();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setChartWidth('chart-capital-segurado');
        this.setChartWidth('chart-patrimonio-idade');
    }

    carteiraSetupChange(carteiraSetup: any) {
        this.planner.carteiraSetup_Id = carteiraSetup.value.id;
        console.log(this.carteirasSetup);
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

        this.chartPatrimonioIdadeData = {
            labels: Array.from({length: 21}, (_, i) => i * 5),
            datasets: [
                {
                    type: 'line',
                    label: 'Realidade Atual',
                    data: Array.from({length: 21}, (_, i) => parseInt((Math.random() * (100 - 0) + 0).toString())),
                    backgroundColor: colors
                },
                {
                    type: 'bar',
                    label: 'Planejado',
                    data: Array.from({length: 21}, (_, i) => parseInt((Math.random() * (100 - 0) + 0).toString())),
                    backgroundColor: colors
                }
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
            }
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

        this.chartCapitalSeguradoOptions =  {
            plugins: {
              title: {
                display: true,
                text: 'Capital Segurado x Evolução Patrimonial',
                font: {
                  size: 20
                },
                color: Colors.primary
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
        this.principaisObjetivos.push(new PrincipaisObjetivos)
    }

    removerObjetivo(item: PrincipaisObjetivos) {
        let index = this.principaisObjetivos.findIndex(x => x == item);
        if (index != -1) {
            this.principaisObjetivos.splice(index, 1);
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
        this.sendData.emit(form);
    }

}


