import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChartSimple, faEdit, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import * as $ from 'jquery';
import { CarteiraProdutoRel } from 'src/app/models/carteira-produto-rel';
import { carteiraRiscoColumns, CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
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
    allProdutos: Produto[] = [];
    produtosRisco: Produto[] = [];
    percentual: number = '' as unknown as number;
    tipoRiscos: TipoRisco[] = [];

    selectedRisco: TipoRisco = new TipoRisco;
    url = '';

    cmp = (a: any, b: any) => ((a > b) as unknown as number) - ((a < b) as unknown as number);

    dataProduto: any;
    optionsChartProduto: any;
    chartWidth: string = '100%';
    chartHeight: string = '70px';
    @ViewChild('chartProdutos') private chartProdutos;
    subscription: Subscription[] = [];
    hasViewInit = false;

    @ViewChildren('_percentual') percentuais: QueryList<NgModel>;
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private produtoService: ProdutoService,
        private activatedRoute: ActivatedRoute,
        private setupService: CarteiraSetupService,
        private dropdown: DropdownService,
    ) {
        var params = this.activatedRoute.params.subscribe(item => this.isEditPage = !!item['setup_id']);
        this.subscription.push(params);


        lastValueFrom(this.dropdown.getRisco())
            .then((res) => {
                this.selectedRisco = res[0];
            })
            .finally(() => this.loading = false);
            
        var tipoRisco = this.dropdown.tipoRisco.subscribe(res => this.tipoRiscos = res);
        this.subscription.push(tipoRisco);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar') ) {
            var empresa = this.empresaService.empresa.subscribe(res => {
                this.allProdutos = res.produto;
            });
            this.subscription.push(empresa);
        } else {
            lastValueFrom(this.produtoService.getList())
            .then(async (res) => {
                this.allProdutos = res;
                if (this.tipoRiscos.length == 0) 
                    this.selectedRisco = { id: 1, nome: 'Baixissimo', percentualDisponivel: 100 };
                this.setProdutosByRisco();
            })
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            if (this.hasViewInit) {
                this.setChartProduto();
                this.validatePercentualRisco();
            }
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
        this.hasViewInit = true;
        var windowWidth = window.innerWidth;
        var container = $('.chart-container').width() ?? 0;
        var viewport = 100 / windowWidth;
        this.chartWidth = (viewport * container).toString() + 'vw';
        this.setChartProduto();
        this.validatePercentualRisco();
    }

    parseFloat(value: string) {
        return parseFloat(value)
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

    setProdutosByRisco() {
        console.log('setProdutosByRisco')
        let produtosExistentes = this.objeto.carteiraProdutoRel.map(x => x.produto_Id);
        // Seleciona os produtos desse risco, que estão ativos e ainda não foram selecionados
        this.produtosRisco = this.allProdutos.filter(x => x.tipoRisco_Id == this.selectedRisco!.id
            && x.dataDesativado == null
            && !produtosExistentes.includes(x.id));

        this.produtosRisco = this.produtosRisco.sort((x, y) => {
            if (x.descricao < y.descricao) return -1
            else if (x.descricao > y.descricao) return 1
            else return 0
        });
        this.percentual = '' as unknown as number;
        this.calculaPercentualMaxRisco();
    }

    change(input: NgModel, rel: CarteiraProdutoRel) {
        this.calculaPercentualMaxRisco();
        this.validateInput(input, 1, this.calculaPercentualMaxProduto(rel.produto ));
        this.validatePercentualRisco();
        this.setChartProduto();
        var rels = this.objeto.carteiraProdutoRel.filter(x => x.produto.tipoRisco_Id == rel.produto.tipoRisco_Id);
        var somaPercentuais = rels.map(x => x.percentual).reduce((x, y) => x + y);
        
        this.percentuais.forEach((el, index) => {
            var indexRel = this.objeto.carteiraProdutoRel.map((x,  indexRel ) => rels.map(x => x.produto_Id).includes(x.produto_Id) ? indexRel : -1).filter(x => x != -1);
            if (indexRel.includes(index + 1)) {
                if (somaPercentuais > 100) {
                    el.control.setErrors({max: true})
                } else {
                    delete el.control.errors?.['max'];
                    el.control.updateValueAndValidity();
                }
            }
        })
    }

    calculaPercentualMaxRisco() {
        this.tipoRiscos = this.tipoRiscos.map(x => {
            let produtosRel = this.objeto.carteiraProdutoRel.filter(p => p.produto.tipoRisco_Id == x.id);
            var soma = produtosRel.length > 0 ? produtosRel.map(x => x.percentual).reduce((x, y) => x + y) : 0;
            x.percentualDisponivel = 100 - soma;
            x.percentualDisponivel = x.percentualDisponivel < 0 ? 0 : x.percentualDisponivel;
            return x;
        });
    }

    calculaPercentualMaxProduto(produto: Produto) {
        var percentuais = this.objeto.carteiraProdutoRel.filter(x => x.produto_Id != produto.id && x.produto.tipoRisco_Id == produto.tipoRisco_Id).map(x => x.percentual);
        var somaOutrosRels = percentuais.length > 0 ? percentuais.reduce((x, y) => x + y) : 0;
        var dif = 100 - somaOutrosRels;
        dif = dif < 0 ? 0 : dif
        return dif;
    }

    setChartProduto() {
        let index = 0;
        let tipoRiscos = this.objeto.carteiraProdutoRel.filter(x => x.produto.tipoRisco != undefined).map(x => x.produto.tipoRisco);
        tipoRiscos = tipoRiscos.filter((value: any, index: any, self: any) => index === self.findIndex((x: any) => (x.id === value.id)));
        if (tipoRiscos.length > 0) {
            var chartHeight = 70;
            tipoRiscos.forEach(item => chartHeight = chartHeight += 30);
            this.chartHeight = chartHeight + 'px';
            this.optionsChartProduto = {
                onClick: (e: any) => { },
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
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
                            callback: function (value, index, ticks) {
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

            this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produto.tipoRisco_Id, y.produto.tipoRisco_Id) || this.cmp(x.produto.descricao, y.produto.descricao))
            let a = this.objeto.carteiraProdutoRel.map(x => {
                return {
                    type: 'bar',
                    axis: 'y',
                    label: `${x.produto.descricao}`,
                    backgroundColor: colors[index++],
                    data: [x]
                }
            })
            this.dataProduto = {
                datasets: a,
            }
            setTimeout(() => {
                this.chartProdutos.chart.update();
            }, 300);
        }

    }

    getRisco(tipoRisco_Id: number) {
        return this.tipoRiscos.find(x => x.id == tipoRisco_Id)
    }

    adicionarProduto() {
        if (!this.produto)
            this.toastr.error('Selecione um produto para adicionar');
        else {
            let carteiraProdutoRel: CarteiraProdutoRel = {
                id: 0,
                percentual: this.percentual,
                carteiraSetup_Id: 0,
                produto: this.produto,
                produto_Id: this.produto.id,
            }
            var index = this.objeto.carteiraProdutoRel.findIndex(x => x.produto_Id == this.produto?.id);
            var jaExiste = this.objeto.carteiraProdutoRel.find(x => x.produto_Id == this.produto?.id);
            if (jaExiste && index != -1) { // Se já existir, remove e adiciona um novo
                carteiraProdutoRel.id = jaExiste.id;
                this.objeto.carteiraProdutoRel.splice(index, 1, carteiraProdutoRel);
            } else { // Se não existir, só adiciona um novo
                this.objeto.carteiraProdutoRel.push(carteiraProdutoRel);
            }
            this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produto.tipoRisco_Id, y.produto.tipoRisco_Id) || this.cmp(x.produto.descricao, y.produto.descricao))
            this.setupService.setObject(this.objeto);
            delete this.produto;
            this.setProdutosByRisco();
            this.calculaPercentualMaxRisco();
            this.setChartProduto();
            this.validatePercentualRisco();
        }
    }

    removeProduto(item: CarteiraProdutoRel) {
        let index = this.objeto.carteiraProdutoRel.findIndex(x => x.id == item.id && x.produto_Id == item.produto.id);
        if (index != -1) {
            this.objeto.carteiraProdutoRel.splice(index, 1);
            this.setupService.setObject(this.objeto);
            this.setChartProduto();
            this.setProdutosByRisco();
            this.validatePercentualRisco();
        }
    }

    validatePercentualRisco() {
        console.log('validatePercentualRisco')
        if (this.objeto.carteiraProdutoRel.length == 0) {
            this.erro.push('Você deve selecionar pelo menos um produto');
            return false
        }
        let invalid = false;
        let riscos: CarteiraRiscoRel[] = [];
        let produtos = this.objeto.carteiraProdutoRel.filter(x => x.produto.tipoRisco != undefined);
        for (let rel of produtos) {
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
                    showMenuOption: true,
                    canSelect: true,
                });
            }
        }

        var baixissimos = this.objeto.carteiraProdutoRel.filter(x => x.produto.tipoRisco_Id == 1)
        console.log('condicao 1', riscos.filter(x => x.tipoRisco_Id != 1 && x.percentual != 100 ));
        console.log('condicao 2', riscos.filter(x => x.tipoRisco_Id == 1 && baixissimos.length > 1 && x.percentual != 100 ));
        console.log('condicao 3', riscos.filter(x => (x.tipoRisco_Id != 1&& x.percentual != 100 ) || (x.tipoRisco_Id == 1 && baixissimos.length > 1 && x.percentual != 100 )));

        this.erro = riscos.filter(x =>  
            (x.tipoRisco_Id != 1
                && x.percentual != 100 )
            || (x.tipoRisco_Id == 1
                && baixissimos.length > 1
                && x.percentual != 100 )
            )
            .map(x => `A soma do percentual dos produtos para o risco ${x.tipoRisco.nome} deve ser 100%.`);
        if (this.erro.length > 0) {
            invalid = true;
        }
        return invalid;
    }

    validateInput(input: NgModel, min: number, max: number) {
        if (input.value > 100) {    
            input.control.setErrors({ max: true });
            return input;
        }
        if (input.value > max) {
            input.control.setErrors({ max: true });
            return input;
        }
        if (input.value < min) {
            input.control.setErrors({ min: true });
        }
        return input;
        
    }
}