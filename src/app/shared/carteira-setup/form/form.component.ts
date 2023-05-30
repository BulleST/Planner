import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartSimple, faEdit, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import * as $ from 'jquery';
import { CarteiraProdutoRel } from 'src/app/models/carteira-produto-rel';
import { carteiraRiscoColumns, CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { Crypto } from 'src/app/utils/crypto';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { colors } from 'src/app/utils/colors.enum';

@Component({
    selector: 'app-form-carteira-setup',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormCarteiraSetupComponent implements OnDestroy, OnChanges {

    @Input() objeto: CarteiraSetup = new CarteiraSetup;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    @Input() clearData: boolean = false;
    
    produtos: Produto[] = [];
    // carteirasSetup: CarteiraSetup[] = [];

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faChartSimple = faChartSimple;
    faTable = faTable;
    faEdit = faEdit;

    isEditPage: boolean = false;
    loadingCarteiras = true;
    loadingTributacao = false;
    carteiraRiscoColumns = carteiraRiscoColumns;

    produto?: Produto;
    percentual: number = '' as unknown as number;
    tipoRiscos: TipoRisco[] = [];
    
    selectedRisco: TipoRisco = new TipoRisco;
    url = '';

    cmp = (a: any, b: any) => {
        return ((a > b) as unknown as number) - ((a < b) as unknown as number)
    };

    dataProduto: any;
    optionsProduto: any;
    chartWidth: string = '100%';
    chartHeight: string = '70px';
    @ViewChild('chartProdutos') private chartProdutos;
    subscription: Subscription[] = [];

    
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private activatedRoute: ActivatedRoute,
        private setupService: CarteiraSetupService,
        private dropdown: DropdownService,
        private router: Router,
        private crypto: Crypto,
    ) {

        var params = this.activatedRoute.params.subscribe(item => this.isEditPage = !!item['setup_id']);
        this.subscription.push(params);

        var tipoRisco = this.dropdown.tipoRisco.subscribe(res => this.tipoRiscos = res);
        this.subscription.push(tipoRisco);
        lastValueFrom(this.dropdown.getRisco())
        .then((res) => {
            this.selectedRisco = res[0];
            this.tipoRiscoChange();
        }).finally(() => this.loading = false);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar')) {
            var empresa = this.empresaService.empresa.subscribe(res => this.produtos = res.produto);
            this.subscription.push(empresa);
        } else {
            lastValueFrom(this.produtoService.getList()).then((res) => this.produtos = res)
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


    ngOnChanges(changes: SimpleChanges): void {
        let index = 0;
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.setChartProduto('ngOnChanges');
            this.validatePercentualRisco();
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;

        if (changes['clearData']) {
            this.clearData = changes['clearData'].currentValue;
            if (this.clearData) {
                delete this.produto;
                this.percentual = '' as unknown as number;
            }
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

    async tipoRiscoChange() {
        let produtos: Produto[] = [];
        if (this.url.includes('empresas/cadastrar')) {
            produtos = this.empresaService.object.produto;
        } else {
            produtos = await lastValueFrom(this.produtoService.getList());
        }
        if (this.selectedRisco) { // Seleciona os produtos desse risco
            this.produtos = produtos.filter(x => x.tipoRisco_Id == this.selectedRisco!.id);
        }
        this.percentual = '' as unknown as number;

        this.calcularPercentuais();

    }

    calcularPercentuais() {
        console.group('calcularPercentuais');
        this.tipoRiscos = this.tipoRiscos.map(x => {
            console.log('tipoRiscos: ', x);
            let produtosRel = this.objeto.carteiraProdutoRel.filter(p => p.produto.tipoRisco_Id == x.id);
            console.log('produtosRel: ', produtosRel);
            var soma = produtosRel.length > 0 ? produtosRel.map(x => x.percentual).reduce((x,y) => x+y) : 0;
            console.log('soma: ', soma);
            x.percentualDisponivel = 100 - soma;
            console.log('percentualDisponivel: ', x.percentualDisponivel);
            return x;
        });
        console.groupEnd();
    }

    getRisco(tipoRisco_Id: number) {
        return this.tipoRiscos.find(x => x.id == tipoRisco_Id)
    }
    
    setChartProduto(str: string) {
        let index = 0;
        let tipoRiscos = this.objeto.carteiraProdutoRel.map(x => x.produto.tipoRisco);
        tipoRiscos = tipoRiscos.filter((value: any, index: any, self: any) => {
            return index === self.findIndex((x: any) => (x.id === value.id))
        });
        var chartHeight = 70;
        tipoRiscos.forEach(item => chartHeight+=30);
        this.chartHeight = chartHeight + 'px';
        
        this.optionsProduto = {
            onClick: (e: any) => { },
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    padding: {
                        x: 15,
                        y: 10
                    },
                    callbacks: {
                        beforeTitle: (ctx) => {
                            let obj = ctx[0].element.$context.raw as CarteiraProdutoRel;
                            return obj.produto.tipoRisco?.nome;
                        },
                        title: (ctx) => {
                            return '';
                        },
                        afterTitle: (ctx) => {
                            let obj = ctx[0].element.$context.raw as CarteiraProdutoRel;
                            return obj.produto.descricao;
                        },
                    }
                },
            },
            scales: {
                xAxes: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    suggestedMax: 100,
                    scaleLabel: { display: true },
                    grid: {
                        drawBorder: false,
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + '%';
                        }
                    }
                },
                yAxes: {
                    scaleLabel: { display: true },
                    stacked: true,
                    drawOnChartArea: tipoRiscos.length > 0,
                    drawBorder: tipoRiscos.length > 0,
                    display: tipoRiscos.length > 0,
                }
            },
            parsing: {
                yAxisKey: 'produto.tipoRisco.nome',
                xAxisKey: 'percentual'
            },
        }
       
        this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produto.tipoRisco_Id, y.produto.tipoRisco_Id) || this.cmp(x.percentual, y.percentual))
        let a = this.objeto.carteiraProdutoRel.map(x => {
            return {
                type: 'bar',
                axis: 'y',
                label: `${x.produto.descricao}`,
                backgroundColor: colors[index++],
                data: [ x ]
            }
        })
        this.dataProduto = {
            datasets: a,
        }
        if (this.chartProdutos) {
            this.chartProdutos.chart.update();
        }

    }

    adicionarProduto() {
        console.group('adicionarProduto');
        if (!this.produto) {
            this.toastr.error('Selecione um produto para adicionar');
        } 
        else {
            let carteiraProdutoRel: CarteiraProdutoRel = {
                id: 0,
                percentual: this.percentual,
                carteiraSetup_Id: 0,
                produto: this.produto,
                produto_Id: this.produto.id,
            }
            console.log('carteiraProdutoRel: ', carteiraProdutoRel)
            var index = this.objeto.carteiraProdutoRel.findIndex(x => x.produto_Id == this.produto?.id);
            var jaExiste = this.objeto.carteiraProdutoRel.find(x => x.produto_Id == this.produto?.id);
            if (jaExiste && index != -1) { // Se já existir, remove e adiciona um novo
                carteiraProdutoRel.id = jaExiste.id;
                this.objeto.carteiraProdutoRel.splice(index, 1, carteiraProdutoRel);
            } else { // Se não existir, só adiciona um novo
                this.objeto.carteiraProdutoRel.push(carteiraProdutoRel);
            }
            
            this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produto.tipoRisco_Id, y.produto.tipoRisco_Id) || this.cmp(x.percentual, y.percentual))
            this.calcularPercentuais();
            this.setChartProduto('adicionarProduto');
            this.setupService.setObject(this.objeto);
            delete this.produto;
            this.percentual = '' as unknown as number;

        }
        console.groupEnd();
    }

    removeProduto(item: CarteiraProdutoRel) {
        let index = this.objeto.carteiraProdutoRel.findIndex(x => x.id == item.id && x.produto_Id == item.produto.id);
        if (index != -1) {
            this.objeto.carteiraProdutoRel.splice(index, 1);
            this.setupService.setObject(this.objeto);
            this.setChartProduto('removeProduto');
            this.calcularPercentuais();
        }
    }

    validatePercentualRisco() {
        let invalid = false;
        let riscos: CarteiraRiscoRel[] = [];
        for(let rel of this.objeto.carteiraProdutoRel) {
            let index = riscos.findIndex(x => x.tipoRisco_Id == rel.produto.tipoRisco_Id);
            if (index != -1) {
                riscos[index].percentual += rel.percentual;
            } else {
                riscos.push({
                    id: 0,
                    carteiraSetup_Id: rel.carteiraSetup_Id,
                    tipoRisco: rel.produto.tipoRisco as TipoRisco,
                    tipoRisco_Id: rel.produto.tipoRisco_Id,
                    percentual: rel.percentual,
                });
            }
        }
        this.erro = riscos.filter(x => x.percentual != 100).map(x => {
            return `A soma do percentual dos produtos para cada tipo de risco ${x.tipoRisco.nome} deve ser 100%.`
        });
        if (this.objeto.carteiraProdutoRel.length == 0) {
            this.erro.push('Você deve selecionar pelo menos um produto');
        }
        if(this.erro.length > 0) {
            invalid = true;
        }
        return invalid;
    }
}