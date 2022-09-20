import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartSimple, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import * as $ from 'jquery';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { carteiraRiscoColumns, CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { Crypto } from 'src/app/utils/crypto';

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
    @Input() produtos: Produto[] = [];
    @Input() carteirasSetup: CarteiraSetup[] = [];
    carteiraRiscoColumns = carteiraRiscoColumns;
    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faChartSimple = faChartSimple;
    faTable = faTable;
    tributacoes: Tributacao[] = [];
    // novaCarteiraSetup = true;
    loadingCarteiras = true;
    loadingTributacao = false;
    produto?: Produto;
    tributacao?: Tributacao;
    _carteiraSetup: any;
    maxPercentual = 100;
    data: any;
    options: any;
    chartWidth: string = '0';
    chartPalete = [
        '#2a718b', // --primary-light
        '#f9a814', // --yellow
        '#242424', // --grey-light
        '#104456', // --primary
        '#181818', // --grey
        '#092a36', // --primary-dark
    ];
    view = true;
    totalPercentage = 0;
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private activatedRoute: ActivatedRoute,
        private setupService: CarteiraSetupService,
        private router: Router,
        private crypto: Crypto,
    ) {
        // this.novaCarteiraSetup = this.objeto.id == undefined;

        let index = 0;
        this.objeto.carteiraRiscoRel = this.objeto.carteiraRiscoRel != undefined ? this.objeto.carteiraRiscoRel : [];
        this.objeto.carteiraProdutoRel = this.objeto.carteiraProdutoRel != undefined ? this.objeto.carteiraProdutoRel : [];
        this._carteiraSetup = this.objeto
        
        this.data = {
            labels: [''],
            datasets: this.objeto.carteiraRiscoRel.map(x => {
                return {
                    type: 'bar',
                    label: x.tipoRisco.nome,
                    backgroundColor: this.chartPalete[index++],
                    showLine: false,
                    data: [ x ],
                }
            })
        };
        this.options = {
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
                        offset: false
                    }
                },
                yAxes: {
                    stacked: true,
                    display: false,
                }
            }
        };
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        let index = 0;
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.objeto.carteiraRiscoRel = this.objeto.carteiraRiscoRel != undefined ? this.objeto.carteiraRiscoRel : [];
            this.objeto.carteiraProdutoRel = this.objeto.carteiraProdutoRel != undefined ? this.objeto.carteiraProdutoRel : [];
            
            if (this.objeto.carteiraRiscoRel && this.objeto.carteiraRiscoRel.length > 0) {
                this.maxPercentual = 100 - this.objeto.carteiraRiscoRel.map(res => res.percentual).reduce((x,y) => x + y);
                this.totalPercentage = this.objeto.carteiraRiscoRel.map(x => x.percentual).reduce((x,y) => x+y);
            }

            this._carteiraSetup = this.objeto;
            console.log(this._carteiraSetup)
            this.data = {
                labels: [''],
                datasets: this.objeto.carteiraRiscoRel.map(x => {
                    return {
                        type: 'bar',
                        label: x.tipoRisco.nome,
                        backgroundColor: this.chartPalete[index++],
                        showLine: false,
                        data: [ x ],
                    }
                })
            };
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;

        if (changes['carteirasSetup']) {
            this.carteirasSetup = changes['carteirasSetup'].currentValue;
        }

        // this.novaCarteiraSetup = this.objeto.id == undefined;
    }

    ngAfterViewInit(): void {
        var windowWidth = window.innerWidth; 
        var container = $('.chart-container').width() ?? 0;
        var viewport = 100 / windowWidth;
        this.chartWidth =  (viewport * container).toString() + 'vw'; 
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        var windowWidth = window.innerWidth; 
        var container = $('.chart-container').width() ?? 0;
        var viewport = 100 / windowWidth;
        this.chartWidth =  (viewport * container).toString() + 'vw'; 
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
        console.log(this.activatedRoute.snapshot)
        // this.router.navigate(['risco', this.crypto.encrypt(object)]);
    }

    carteiraSetupChange(model: any) {
        console.log('model: ', model.value)
        console.log('this._carteiraSetup: ', this._carteiraSetup)
        if (model.value) {
            if (typeof model.value == 'string') {
                this.objeto.id = 0;
                this.objeto.nome = this._carteiraSetup as string;
            } else if (typeof model.value == 'object') {
                this.objeto = this._carteiraSetup as CarteiraSetup;
            }
        } 
    }

    adicionarProduto() {
        if (this.produto == undefined) {
            this.toastr.error('Selecione um produto para adicionar');
        } else if (this.tributacao == undefined) {
            this.toastr.error('Selecione uma tributação para adicionar');
        } else {
            var jaExiste = this.objeto.carteiraProdutoRel.map(x => x.produtoTributacaoRel).find(x => x.produto_Id == this.produto?.id && x.tributacao_Id == this.tributacao?.id);
            if (jaExiste) 
                this.toastr.error('Combinação já cadastrada')
            
        }
    }

    removeItem(id: number) {
        
    }
}


