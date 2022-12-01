import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { CarteiraProdutoRel } from 'src/app/models/carteira-produto-rel';
import { carteiraRiscoColumns, CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { Crypto } from 'src/app/utils/crypto';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { flashOnEnterAnimation } from 'angular-animations';
import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
import { lastValueFrom } from 'rxjs';
import { colors } from 'src/app/utils/colors.enum';

@Component({
    selector: 'app-form-carteira-setup',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormCarteiraSetupComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() objeto: CarteiraSetup = new CarteiraSetup;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    
    produtos: Produto[] = [];
    carteirasSetup: CarteiraSetup[] = [];

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
    produtoTributacaoRel?: ProdutoTributacaoRel;
    percentual: number = '' as unknown as number;
    tipoRiscos: TipoRisco[] = [];

    dataRisco: any;
    optionsRisco: any;

    dataProduto: any;
    optionsProduto: any;

    cmp = (a: any, b: any) => {
        return ((a > b) as unknown as number) - ((a < b) as unknown as number)
    };
    chartWidth: string = '0';
    selectedRisco: TipoRisco = new TipoRisco;
    url = '';

    @ViewChild('chartProdutos') private chartProdutos;
    
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

        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['setup_id'];
        });

        this.dropdown.tipoRisco.subscribe(res => this.tipoRiscos = res);
        this.dropdown.getRisco().subscribe({
            next: (res) => {
                this.selectedRisco = res[0];
                this.tipoRiscoChange();
            }
        });
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/cadastrar')) {
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
                }
            });
        }
    }

    ngOnInit(): void {
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

        if (changes['carteirasSetup']) {
            this.carteirasSetup = changes['carteirasSetup'].currentValue;
        }

    }

    ngAfterViewInit(): void {
        // this.setChartProduto('ngAfterViewInit');
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
            produtos = this.empresaService.empresaObject.value.produto;
        } else {
            produtos = await lastValueFrom(this.produtoService.getList())
        }
        if (this.selectedRisco) {
            this.produtos = produtos.filter(x => x.tipoRisco_Id == this.selectedRisco!.id);
        }
        this.percentual = '' as unknown as number;

        this.calcularPercentuais();

    }

    calcularPercentuais() {
        this.tipoRiscos = this.tipoRiscos.map(x => {
            let produtosRel = this.objeto.carteiraProdutoRel
            .filter(p => p.produtoTributacaoRel.produto.tipoRisco_Id == x.id);
            if (produtosRel.length > 0) {
                x.percentualDisponivel = 100 - produtosRel.map(x => x.percentual).reduce((x,y) => x+y)
            } else {
                x.percentualDisponivel = 100
            }
            return x;
        });
    }

    getRisco(tipoRisco_Id: number) {
        return this.tipoRiscos.find(x => x.id == tipoRisco_Id)
    }
    
    setChartProduto(str: string) {
        let index = 0;
        let tipoRiscos = this.objeto.carteiraProdutoRel.map(x => x.produtoTributacaoRel.produto.tipoRisco);
        tipoRiscos = tipoRiscos.filter((value: any, index: any, self: any) => {
            return index === self.findIndex((x: any) => (x.id === value.id))
        });
        this.optionsProduto = {
            onClick: (e: any) => { },
            indexAxis: 'y',
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
                            return '';
                            // return obj.produtoTributacaoRel.produto.tipoRisco?.nome;
                        },
                        title: (ctx) => {
                            return '';
                        },
                        afterTitle: (ctx) => {
                            let obj = ctx[0].element.$context.raw as CarteiraProdutoRel;
                            return obj.produtoTributacaoRel.produto.descricao;
                        },
                        label: (ctx) => {
                            let obj = ctx.element.$context.raw as CarteiraProdutoRel;
                            return obj.produtoTributacaoRel.tributacao.descricao;
                        },
                        afterLabel: (ctx) => {
                            let obj = ctx.element.$context.raw as CarteiraProdutoRel;
                            return 'Alíquota: ' + obj.produtoTributacaoRel.tributacao.aliquota + '%';
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
                yAxisKey: 'produtoTributacaoRel.produto.tipoRisco.nome',
                xAxisKey: 'percentual'
            },
            responsive: true,
        }
       
        this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produtoTributacaoRel.produto.tipoRisco_Id, y.produtoTributacaoRel.produto.tipoRisco_Id) || this.cmp(x.percentual, y.percentual))
        let a = this.objeto.carteiraProdutoRel.map(x => {
            return {
                type: 'bar',
                label: `${x.produtoTributacaoRel.produto.descricao} <br> ${x.produtoTributacaoRel.tributacao.descricao}`,
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
        if (this.produto == undefined) {
            this.toastr.error('Selecione um produto para adicionar');
        } else if (this.produtoTributacaoRel == undefined) {
            this.toastr.error('Selecione uma tributação para adicionar');
        } else {
            
            let p: Produto = Object.assign({}, this.produto)
            p.produtoTributacaoRel = [];
            this.produtoTributacaoRel.produto = p;
            

            let carteiraProdutoRel: CarteiraProdutoRel = {
                id: 0,
                percentual: this.percentual,
                carteiraSetup_Id: this.objeto.id,
                produtoTributacaoRel_Id: this.produtoTributacaoRel.id,
                produtoTributacaoRel: this.produtoTributacaoRel
            }


            var index = this.objeto.carteiraProdutoRel
                            .map(x => x.produtoTributacaoRel)
                            .findIndex(x => x.produto_Id == this.produto?.id 
                                && x.tributacao_Id == this.produtoTributacaoRel?.id);
            var jaExiste = this.objeto.carteiraProdutoRel
                            .map(x => x.produtoTributacaoRel)
                            .find(x => x.produto_Id == this.produto?.id 
                                && x.tributacao_Id == this.produtoTributacaoRel?.id);

            // Se já existir, remove e adiciona um novo
            if (jaExiste && index != -1) {
                carteiraProdutoRel.id = jaExiste.id;
                this.objeto.carteiraProdutoRel.splice(index, 1, carteiraProdutoRel);
            } else {
                this.objeto.carteiraProdutoRel.push(carteiraProdutoRel);
            }
            
            this.objeto.carteiraProdutoRel.sort((x, y) => this.cmp(x.produtoTributacaoRel.produto.tipoRisco_Id, y.produtoTributacaoRel.produto.tipoRisco_Id) || this.cmp(x.percentual, y.percentual))
            this.calcularPercentuais();
            this.setChartProduto('adicionarProduto');
            this.setupService.setObject(this.objeto);
            
            delete this.produtoTributacaoRel;
            delete this.produto;
            this.percentual = '' as unknown as number;

        }
    }

    removeProduto(item: CarteiraProdutoRel) {
        let index = this.objeto.carteiraProdutoRel
            .findIndex(x => x.produtoTributacaoRel.tributacao.id == item.produtoTributacaoRel.tributacao.id
                &&  x.produtoTributacaoRel.produto.id == item.produtoTributacaoRel.produto.id);
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
            let index = riscos.findIndex(x => x.tipoRisco_Id == rel.produtoTributacaoRel.produto.tipoRisco_Id);
            if (index != -1) {
                riscos[index].percentual += rel.percentual;
            } else {
                riscos.push({
                    tipoRisco: rel.produtoTributacaoRel.produto.tipoRisco as TipoRisco,
                    tipoRisco_Id: rel.produtoTributacaoRel.produto.tipoRisco_Id,
                    percentual: rel.percentual,
                    id: 0,
                    carteiraSetup_Id: 0,
                })
            }
        }

        this.erro = riscos.filter(x => x.percentual != 100).map(x => {
            return `A soma do percentual dos produtos para cada tipo de risco ${x.tipoRisco.nome} deve ser 100%.`
        });

        if(this.erro.length > 0) {
            invalid = true;
        }
        invalid

        return invalid;
    }
}


