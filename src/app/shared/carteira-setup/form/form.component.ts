import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartSimple, faEdit, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import * as $ from 'jquery';
import { CarteiraProdutoRel, CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { carteiraRiscoColumns, CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { Crypto } from 'src/app/utils/crypto';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { flashOnEnterAnimation } from 'angular-animations';

@Component({
    selector: 'app-form-carteira-setup',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormCarteiraSetupComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() objeto: CarteiraRequest = new CarteiraRequest;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    /*@Input()*/ produtos: Produto[] = [];
    /*@Input()*/ carteirasSetup: CarteiraSetup[] = [];

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faChartSimple = faChartSimple;
    faTable = faTable;
    faEdit = faEdit;

    isEditPage: boolean = false;
    loadingCarteiras = true;
    loadingTributacao = false;
    carteiraRiscoColumns = carteiraRiscoColumns;

    tributacoes: Tributacao[] = [];
    produto?: Produto;
    tributacao?: Tributacao;
    percentualDisponivelRisco = 100;
    percentualTotalRisco = 0;
    percentualDisponivelProduto = 100;
    percentualTotalProduto = 0;
    percentual: number = '' as unknown as number;
    riscos: TipoRisco[] = [];
    dataRisco: any;
    optionsRisco: any;
    chartWidth: string = '0';
    chartPalete = [
        '#2a718b', // --primary-light
        // '#f9a814', // --yellow
        '#242424', // --grey-light
        '#104456', // --primary
        '#181818', // --grey
        '#092a36', // --primary-dark
    ];
    viewRisco = true; // True para grafico; False para tabela
    viewProduto = true; // True para grafico; False para tabela
    selectedRisco?: CarteiraRiscoRel;
    selectedRiscoIndex?: number;
    urlArray = '';

    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private activatedRoute: ActivatedRoute,
        private setupService: CarteiraSetupService,
        private router: Router,
        private crypto: Crypto,
    ) {

        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['setup_id'];
        });

        this.urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.urlArray.includes('empresas/cadastrar')) {
            this.empresaService.empresaObject.subscribe(res => {
                this.carteirasSetup = res.carteiraSetup;
                this.produtos = res.produto;
            });
        } else {
            this.setupService.getList().subscribe({
                next: (res) => {
                    this.carteirasSetup = res;
                }
            });
            this.produtoService.getList().subscribe({
                next: (res) => {
                    this.produtos = res;
                    this.produtos.map(p => {
                        p.tributacao = p.produtoTributacaoRel.map(x => x.tributacao)
                        return p;
                    });
                }
            });
        }

        this.setupService.percentualDisponivelRisco.subscribe(res => this.percentualDisponivelRisco = res);
        this.setupService.percentualTotalRisco.subscribe(res => this.percentualTotalRisco = res);
        this.setupService.percentualTotalProduto.subscribe(res => this.percentualTotalProduto = res);


        this.setChartRisco();

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        let index = 0;
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.riscos = this.objeto.carteiraRiscoRel.map(x => x.tipoRisco);
            this.setChartRisco();
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;

        if (changes['carteirasSetup']) {
            this.carteirasSetup = changes['carteirasSetup'].currentValue;
        }

    }

    ngAfterViewInit(): void {
        var windowWidth = window.innerWidth;
        var container = $('.chart-container').width() ?? 0;
        var viewport = 100 / windowWidth;
        this.chartWidth = (viewport * container).toString() + 'vw';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        var windowWidth = window.innerWidth;
        var container = $('.chart-container').width() ?? 0;
        var viewport = 100 / windowWidth;
        this.chartWidth = (viewport * container).toString() + 'vw';
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

    selectData(event: any) {
        let object = event.element.element.$context.raw as CarteiraRiscoRel;
        if (this.selectedRisco == object) {
            delete this.selectedRisco;
            delete this.selectedRiscoIndex;
        } else {
            this.selectedRisco = object;
            this.selectedRiscoIndex = event.element.datasetIndex;
            this.tipoRiscoChange();
        }
    }

    excluirRisco(risco: CarteiraRiscoRel) {
        this.setupService.excluirRisco(risco);

        let index = this.riscos.findIndex(x => x.id == risco.tipoRisco_Id);
        if (index != -1) {
            this.riscos.splice(index, 1);
        }
        this.toastr.success('OK');
    }

    editarRisco(risco: CarteiraRiscoRel) {
        this.router.navigate(['risco', this.crypto.encrypt(risco)], { relativeTo: this.activatedRoute });
    }


    tipoRiscoChange() {
        let produtos: Produto[] = [];
        if (this.urlArray.includes('empresas/cadastrar')) {
            produtos = this.empresaService.empresaObject.value.produto
        } else {
            produtos = this.produtoService.list.value;
        }
        if (this.selectedRisco) {
            this.produtos = produtos.filter(x => x.tipoRisco_Id == this.selectedRisco!.tipoRisco.id);
        }
        this.calcularPercentualProduto();

    }

    calcularPercentualProduto() {
        // Calcula o percentual disponível em produtos para tal risco
        if (this.selectedRisco != undefined) {
            let percentuais = this.objeto.carteiraProdutoRel
                .filter(x => x.produtoTributacaoRel.produto.tipoRisco_Id == this.selectedRisco!.tipoRisco.id)
                .map(x => x.percentual)


            if (percentuais.length > 0) {
                this.percentualTotalProduto = percentuais.reduce((x, y) => x + y);
                this.percentualDisponivelProduto = 100 - this.percentualTotalProduto;
            } else {
                this.percentualTotalProduto = 0;
                this.percentualDisponivelProduto = 100;
            }

        } else {
            this.percentualTotalProduto = 0;
            this.percentualDisponivelProduto = 100;
        }
    }

    setChartRisco() {
        this.optionsRisco = {
            onClick: (e: any) => {
                let index = 0;
                for(let dataset of e.chart.data.datasets) {
                    dataset.backgroundColor = this.chartPalete[index++];
                }
                if (this.selectedRiscoIndex != undefined) {
                    e.chart.data.datasets[this.selectedRiscoIndex].backgroundColor = '#f9a814'
                }
                e.chart.update();
            },
            parsing: {
                xAxisKey: 'percentual',
                yAxisKey: 'percentual',
            },
            indexAxis: 'y',
            tooltips: {
                mode: 'index',
                intersect: false,
                enabled: true,
            },
            scales: {
                xAxes: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    grid: {
                        borderWidth: 0,
                        drawBorder: false,
                        tickLength: 2,
                        // offset: false    
                    }
                },
                yAxes: {
                    stacked: true,
                    display: false,
                }
            }
        };

        let index = 0;
        let datasetRisco = this.objeto.carteiraRiscoRel.map(x => {
            let color: string;
            if (this.selectedRisco
                && this.selectedRisco.id == x.id
                && this.selectedRisco.tipoRisco_Id == x.tipoRisco_Id
                && this.selectedRisco.carteiraSetup_Id == x.carteiraSetup_Id
                && this.selectedRisco.percentual == x.percentual
            ) {
                color = '#f9a814'
            } else {
                color = this.chartPalete[index++];
            }
            return {
                type: 'bar',
                label: x.tipoRisco.nome,
                backgroundColor: color,
                showLine: false,
                data: [x],
            }
        })
        this.dataRisco = {
            labels: [''],
            datasets:  datasetRisco
        };
    }

    adicionarProduto() {
        if (this.produto == undefined) {
            this.toastr.error('Selecione um produto para adicionar');
        } else if (this.tributacao == undefined) {
            this.toastr.error('Selecione uma tributação para adicionar');
        } else {
            var jaExiste = this.objeto.carteiraProdutoRel.map(x => x.produtoTributacaoRel).find(x => x.produto_Id == this.produto?.id && x.tributacao_Id == this.tributacao?.id);
            if (jaExiste) {
                this.toastr.error('Combinação já cadastrada')
                return;
            }

            this.objeto.carteiraProdutoRel.push({
                id: 0,
                produtoTributacao_Id: 0,
                percentual: this.percentual,
                carteiraSetup_Id: this.objeto.id,
                produtoTributacaoRel: {
                    id: 0,
                    produto_Id: this.produto.id,
                    produto: this.produto,
                    tributacao: this.tributacao,
                    tributacao_Id: this.tributacao.id,
                }
            });
            this.calcularPercentualProduto();
            this.objeto.carteiraProdutoRel.sort((x, y) => x.id - y.id);
            this.setupService.setObject(this.objeto);
            delete this.tributacao;
            delete this.produto;
            this.percentual = '' as unknown as number;

        }
    }

    removeProduto(item: CarteiraProdutoRel) {
        let index = this.objeto.carteiraProdutoRel.findIndex(x => x.produtoTributacaoRel.tributacao_Id == item.produtoTributacaoRel.tributacao_Id
            && x.produtoTributacaoRel.produto_Id == item.produtoTributacaoRel.produto_Id);
        if (index != -1) {
            this.objeto.carteiraProdutoRel.splice(index, 1);
            this.calcularPercentualProduto();
            this.setupService.setObject(this.objeto);
        }
    }
}


