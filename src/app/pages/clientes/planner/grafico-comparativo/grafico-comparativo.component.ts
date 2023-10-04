import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { TipoAtivo } from 'src/app/models/tipoAtivo.model';
import { TipoLiquidez } from 'src/app/models/tipoLiquidez.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
    selector: 'app-grafico-comparativo',
    templateUrl: './grafico-comparativo.component.html',
    styleUrls: ['./grafico-comparativo.component.css']
})
export class GraficoComparativoComponent implements OnChanges, AfterViewInit {

    @Input() open: boolean = true;
    @Input() planner: Planejamento = new Planejamento;

    
    chartAtivoOptions: any;
    chartAtivoData_Produto: any;
    chartAtivoData_Investimento: any;
    @ViewChild('chartAtivo_Produto') chartAtivo_Produto;
    @ViewChild('chartAtivo_Investimento') chartAtivo_Investimento;
    
    chartRiscoOptions: any;
    chartRiscoData_Produto: any;
    chartRiscoData_Investimento: any;
    @ViewChild('chartRisco_Produto') chartRisco_Produto;
    @ViewChild('chartRisco_Investimento') chartRisco_Investimento;
    
    chartLiquidezOptions: any;
    chartLiquidezData_Produto: any;
    chartLiquidezData_Investimento: any;
    @ViewChild('chartLiquidez_Produto') chartLiquidez_Produto;
    @ViewChild('chartLiquidez_Investimento') chartLiquidez_Investimento;

    chartOptions: any;
    colors: string[] = [
        '#36a2eb', // blue
        '#ff6384', // pink
        '#ff9f40', // orange
        '#9966ff', // purple
        '#ffcd56', // yellow
        '#c9cbcf', // grey 
        '#4bc0c0', // blue green
    ];


    colorsRisco = [
        { id: 1, nome: 'Baixíssimo', color: '#3dad37', visible: true },
        { id: 2, nome: 'Baixo', color: '#74b02e', visible: true },
        { id: 3, nome: 'Moderado', color: '#f2f255', visible: true },
        { id: 4, nome: 'Arrojado', color: '#f78e48', visible: true },
        { id: 5, nome: 'Super Arrojado', color: '#f06e3a', visible: true },
        { id: 6, nome: 'Hedge', color: '#fa3232', visible: true },
    ];

    colorsLiquidez = [
        { id: 1, nome: 'Líquido (até D+3)', color: '#3275fa', visible: true },
        { id: 2, nome: 'Baixa (D+60 a 2 anos)', color: '#43fa32', visible: true },
        { id: 3, nome: 'Média (D+30 a D+60)', color: '#b1fa32', visible: true },
        { id: 4, nome: 'Alta (até D+30)', color: '#fab432', visible: true },
        { id: 5, nome: 'Imobilizado', color: '#fa4332', visible: true },
    ];

    colorsAtivo = [
        { id: 1, nome: 'Renda Fixa', color: '#3275fa', visible: true },
        { id: 2, nome: 'Renda Variável', color: '#fab432', visible: true },
        { id: 3, nome: 'Hedge', color: '#fa4332', visible: true },
    ];

    produtoTotal = 0;
    investimentoTotal = 0;
    viewInit = false;
    plannerChanged = false;

    constructor(
        private dropdown: DropdownService,
        private currency: CurrencyPipe,
        private plannerService: PlannerService
    ) { 
        this.chartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false,
                    fullWidth: false
                },
                colors: {
                  enabled: false
                }
            },
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
              }
            }
        };

        this.plannerService.objeto.subscribe(res => {
            if (this.viewInit && this.plannerChanged) {
                this.planner = res;
                if (this.planner.planejamentoProduto.length > 0)
                    this.produtoTotal = this.planner.planejamentoProduto.map(x => x.sugerido).reduce((x,y) => x+y)
                if (this.planner.planejamentoInvestimento.length > 0)
                    this.investimentoTotal = this.planner.planejamentoInvestimento.map(x => x.montanteAtual).reduce((x,y) => x+y)
                
                this.setChartRisco();
                this.setChartLiquidez();
                this.setChartAtivo();
            }
        })


    }

    ngAfterViewInit(): void {
        this.viewInit = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open']) {
            this.open = changes['open'].currentValue;
        }

        if (changes['planner']) {
            this.planner = changes['planner'].currentValue;

            this.plannerChanged = true;
            if (this.planner.planejamentoProduto.length > 0)
                this.produtoTotal = this.planner.planejamentoProduto.map(x => x.sugerido).reduce((x,y) => x+y)
            if (this.planner.planejamentoInvestimento.length > 0)
                this.investimentoTotal = this.planner.planejamentoInvestimento.map(x => x.montanteAtual).reduce((x,y) => x+y)
            
            this.setChartRisco();
            this.setChartLiquidez();
            this.setChartAtivo();
        }

    }

    voltar() {
        setTimeout(() => {
            this.open = false;
        }, 300);
    }


    setChartRisco() {
        this.chartRiscoOptions = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartRiscoOptions.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var value = ctx[0].element.$context.raw;
                    return this.formatReais(value.reais);
                },
                label: (ctx) => {
                    var value = ctx.parsed;
                    return '  ' + this.formatPorcentagem(value);
                }
            }
        };
        this.chartRiscoOptions.parsing = { key: 'percentual' };

        var produtos: any[] = []; 
        var investimento: any[] = []; 
        this.colorsRisco.forEach(risco => {
            var relsProduto = this.planner.planejamentoProduto.filter(x => x.produto.tipoRisco_Id == risco.id);
            var reaisProduto = relsProduto.length ? relsProduto.map(x => x.sugerido).reduce((x, y )=> x + y) : 0;
            var percentualProduto = (reaisProduto / this.produtoTotal) * 100;
            
            produtos.push({
                percentual: percentualProduto,
                tipoRisco: risco,
                tipoRisco_Id: risco.id,
                reais: reaisProduto,
                label: risco.nome,
                color: risco.color,
            });

            var relsInvestimento = this.planner.planejamentoInvestimento.filter(x => x.investimento.tipoRisco_Id == risco.id);
            var reaisInvestimento = relsInvestimento.length ? relsInvestimento.map(x => x.montanteAtual).reduce((x, y )=> x + y) : 0;
            var percentualInvestimento = (reaisInvestimento / this.produtoTotal) * 100;
            
            investimento.push({
                percentual: percentualInvestimento,
                tipoRisco: risco,
                tipoRisco_Id: risco.id,
                reais: reaisInvestimento,
                label: risco.nome,
                color: risco.color,
            });
        });
        
        this.chartRiscoData_Produto = {
            labels: this.colorsRisco.map(x => x.nome),
            datasets: [{
                    label: produtos.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
                    data: produtos,
                    backgroundColor: produtos.map(x => x.color),
                    borderWidth: 2,
            }]
        };
        this.chartRiscoData_Investimento = {
            labels: this.colorsRisco.map(x => x.nome),
            datasets: [{
                    label: investimento.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
                    data: investimento,
                    backgroundColor: investimento.map(x => x.color),
                    borderWidth: 2,
            }]
        };
    }
    setChartLiquidez() {
        this.chartLiquidezOptions = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartLiquidezOptions.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var value = ctx[0].element.$context.raw;
                    return this.formatReais(value.reais);
                },
                label: (ctx) => {
                    var value = ctx.parsed;
                    return this.formatPorcentagem(value);
                }
            }
        };
        this.chartLiquidezOptions.parsing = { key: 'percentual' };

        var produtos: any[] = []; 
        var investimento: any[] = []; 
        this.colorsLiquidez.forEach(liquidez => {
            var relsProduto = this.planner.planejamentoProduto.filter(x => x.produto.tipoLiquidez_Id == liquidez.id);
            var reaisProduto = relsProduto.length ? relsProduto.map(x => x.sugerido).reduce((x, y )=> x + y) : 0;
            var percentualProduto = (reaisProduto / this.produtoTotal) * 100;
            produtos.push({
                percentual: percentualProduto,
                tipoLiquidez: liquidez,
                tipoLiquidez_Id: liquidez.id,
                reais: reaisProduto,
                label: liquidez.nome,
                color: liquidez.color,
            });

            var relsInvestimento = this.planner.planejamentoInvestimento.filter(x => x.investimento.tipoLiquidez_Id == liquidez.id);
            var reaisInvestimento = relsInvestimento.length ? relsInvestimento.map(x => x.montanteAtual).reduce((x, y )=> x + y) : 0;
            var percentualInvestimento = (reaisInvestimento / this.produtoTotal) * 100;
            
            investimento.push({
                percentual: percentualInvestimento,
                tipoLiquidez: liquidez,
                tipoLiquidez_Id: liquidez.id,
                reais: reaisInvestimento,
                label: liquidez.nome,
                color: liquidez.color,
            });
        });
        
        this.chartLiquidezData_Produto = {
            labels: this.colorsLiquidez.map(x => x.nome),
            datasets: [{
                    label: produtos.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-'),
                    data: produtos,
                    backgroundColor: produtos.map(x => x.color),
                    borderWidth: 2,
            }]
        };
        this.chartLiquidezData_Investimento = {
            labels: this.colorsLiquidez.map(x => x.nome),
            datasets: [{
                    label: investimento.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-'),
                    data: investimento,
                    backgroundColor: investimento.map(x => x.color),
                    borderWidth: 2,
            }]
        };
    }
    setChartAtivo() {
        this.chartAtivoOptions = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartAtivoOptions.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var value = ctx[0].element.$context.raw;
                    return this.formatReais(value.reais);
                },
                label: (ctx) => {
                    var value = ctx.parsed;
                    return this.formatPorcentagem(value);
                }
            }
        };
        this.chartAtivoOptions.parsing = { key: 'percentual' };

        var produtos: any[] = []; 
        var investimento: any[] = []; 
        this.colorsAtivo.forEach(ativo => {
            var relsProduto = this.planner.planejamentoProduto.filter(x => x.produto.tipoAtivo_Id == ativo.id);
            var reaisProduto = relsProduto.length ? relsProduto.map(x => x.sugerido).reduce((x, y )=> x + y) : 0;
            var percentualProduto = (reaisProduto / this.produtoTotal) * 100;
            produtos.push({
                percentual: percentualProduto,
                tipoAtivo: ativo,
                tipoAtivo_Id: ativo.id,
                reais: reaisProduto,
                label: ativo.nome,
                color: ativo.color,
            });

            var relsInvestimento = this.planner.planejamentoInvestimento.filter(x => x.investimento.tipoAtivo_Id == ativo.id);
            var reaisInvestimento = relsInvestimento.length ? relsInvestimento.map(x => x.montanteAtual).reduce((x, y )=> x + y) : 0;
            var percentualInvestimento = (reaisInvestimento / this.produtoTotal) * 100;
            
            investimento.push({
                percentual: percentualInvestimento,
                tipoAtivo: ativo,
                tipoAtivo_Id: ativo.id,
                reais: reaisInvestimento,
                label: ativo.nome,
                color: ativo.color,
            });
        });
        
        this.chartAtivoData_Produto = {
            labels: this.colorsAtivo.map(x => x.nome),
            datasets: [{
                    label: produtos.map(x => x.tipoAtivo ? x.tipoAtivo.nome : '-'),
                    data: produtos,
                    backgroundColor: produtos.map(x => x.color),
                    borderWidth: 2,
            }]
        };
        this.chartAtivoData_Investimento = {
            labels: this.colorsAtivo.map(x => x.nome),
            datasets: [{
                    label: investimento.map(x => x.tipoAtivo ? x.tipoAtivo.nome : '-'),
                    data: investimento,
                    backgroundColor: investimento.map(x => x.color),
                    borderWidth: 2,
            }]
        };
    }


    setVisibilityRisco(risco: any) {
        this.chartRisco_Investimento.chart.toggleDataVisibility(risco.id == 0 ? 0 : risco.id - 1 )
        this.chartRisco_Investimento.chart.update()
        this.chartRisco_Produto.chart.toggleDataVisibility(risco.id == 0 ? 0 : risco.id - 1 )
        this.chartRisco_Produto.chart.update()
    }
    setVisibilityLiquidez(liquidez: any) {
        this.chartLiquidez_Investimento.chart.toggleDataVisibility(liquidez.id == 0 ? 0 : liquidez.id - 1 )
        this.chartLiquidez_Investimento.chart.update()
        this.chartLiquidez_Produto.chart.toggleDataVisibility(liquidez.id == 0 ? 0 : liquidez.id - 1 )
        this.chartLiquidez_Produto.chart.update()
    }
    setVisibilityAtivo(ativo: any) {
        this.chartAtivo_Investimento.chart.toggleDataVisibility(ativo.id == 0 ? 0 : ativo.id - 1 )
        this.chartAtivo_Investimento.chart.update()
        this.chartAtivo_Produto.chart.toggleDataVisibility(ativo.id == 0 ? 0 : ativo.id - 1 )
        this.chartAtivo_Produto.chart.update()
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
