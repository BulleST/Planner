import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { TipoAtivo } from 'src/app/models/tipoAtivo.model';
import { TipoLiquidez } from 'src/app/models/tipoLiquidez.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
    selector: 'app-grafico-comparativo',
    templateUrl: './grafico-comparativo.component.html',
    styleUrls: ['./grafico-comparativo.component.css']
})
export class GraficoComparativoComponent implements OnChanges {

    @Input() open: boolean = true;
    @Input() planner: Planejamento = new Planejamento;

    chartAtivoData_Investimento: any;
    chartAtivoOptions_Investimento: any;
    @ViewChild('chartAtivo_Investimento') chartAtivo_Investimento;
    
    chartRiscoData_Investimento: any;
    chartRiscoOptions_Investimento: any;
    @ViewChild('chartRisco_Investimento') chartRisco_Investimento;
    
    chartLiquidezData_Investimento: any;
    chartLiquidezOptions_Investimento: any;
    @ViewChild('chartLiquidez_Investimento') chartLiquidez_Investimento;

    chartAtivoData_Produto: any;
    chartAtivoOptions_Produto: any;
    @ViewChild('chartAtivo_Produto') chartAtivo_Produto;
    
    chartRiscoData_Produto: any;
    chartRiscoOptions_Produto: any;
    @ViewChild('chartRisco_Produto') chartRisco_Produto;
    
    chartLiquidezData_Produto: any;
    chartLiquidezOptions_Produto: any;
    @ViewChild('chartLiquidez_Produto') chartLiquidez_Produto;

    chartOptions: any;

    ativos: TipoAtivo[] = [];
    riscos: TipoRisco[] = [];
    liquidez: TipoLiquidez[] = [];

    colors: string[] = [
        '#36a2eb', // blue
        '#ff6384', // pink
        '#ff9f40', // orange
        '#9966ff', // purple
        '#ffcd56', // yellow
        '#c9cbcf', // grey 
        '#4bc0c0', // blue green
    ];

    produtoTotal = 0;
    investimentoTotal = 0;

    showInvestimentoRisco = true;
    showInvestimentoLiquidez = true;
    showInvestimentoAtivo = true;

    showProdutoRisco = true;
    showProdutoLiquidez = true;
    showProdutoAtivo = true;

    constructor(
        private dropdown: DropdownService,
    ) { 
        this.chartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false,
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
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open']) {
            this.open = changes['open'].currentValue;
        }

        if (changes['planner']) {
            this.planner = changes['planner'].currentValue;

            if (this.planner.planejamentoProduto.length > 0)
                this.produtoTotal = this.planner.planejamentoProduto.map(x => x.sugerido).reduce((x,y) => x+y)
            if (this.planner.planejamentoInvestimento.length > 0)
                this.investimentoTotal = this.planner.planejamentoInvestimento.map(x => x.montanteAtual).reduce((x,y) => x+y)
            
            this.setChartRisco_Investimento();
            this.setChartRisco_Produto();
            // this.setChartLiquidez_Investimento();
            // this.setChartLiquidez_Produto();
            // this.setChartAtivo_Investimento();
            // this.setChartAtivo_Produto();
            console.log(this.planner)
        }

    }

    voltar() {
        setTimeout(() => {
            this.open = false;
        }, 300);
    }


    setChartRisco_Produto() {
        this.chartRiscoOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartRiscoOptions_Produto.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var oi = ctx[0].element.$context.raw
                    return 'R$ ' + oi.sugerido;
                },
            }
        };
        this.chartRiscoOptions_Produto.parsing = { key: 'percentual' };
        var value: any[] = [];
        var obj;
        
        // this.showProdutoRisco = value && value.length > 0;

        
        this.planner.planejamentoProduto.forEach(x => {
            var index = value.findIndex(y => x.produto.tipoRisco_Id == y.tipoRisco_Id);
            if (index == -1) {
                obj = {
                    tipoRisco_Id: x.produto.tipoRisco ? x.produto.tipoRisco_Id : 0,
                    tipoRisco: x.produto.tipoRisco ? x.produto.tipoRisco : undefined,
                    sugerido: x.sugerido,
                    label: x.produto.tipoRisco ? x.produto.tipoRisco.nome : '-'
                };
            } else {
                obj = value[index]; 
                obj.sugerido += x.sugerido;
            }
            
            obj.percentual = (obj.sugerido / this.produtoTotal) * 100
            value.splice(index, (index == -1 ? 0 : 1), obj);
        });

        this.chartRiscoData_Produto =  {
            labels: value.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
            datasets: [{
              label: value.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }
    setChartLiquidez_Produto() {
        this.chartLiquidezOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartLiquidezOptions_Produto.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var oi = ctx[0].element.$context.raw
                    return 'R$ ' + oi.sugerido;
                },
            }
        };
        this.chartLiquidezOptions_Produto.parsing = { key: 'percentual' };
        var value: any[] = [];
        var obj;
        
        // this.showProdutoLiquidez = value && value.length > 0;
        
        this.planner.planejamentoProduto.forEach(x => {
            var index = value.findIndex(y => x.produto.tipoLiquidez_Id == y.tipoLiquidez_Id);
            if (index == -1) {
                obj = {
                    tipoLiquidez_Id:  x.produto.tipoLiquidez ? x.produto.tipoLiquidez_Id : 0,
                    tipoLiquidez:  x.produto.tipoLiquidez ? x.produto.tipoLiquidez : undefined,
                    sugerido: x.sugerido,
                    label:  x.produto.tipoLiquidez ? x.produto.tipoLiquidez.nome : '-'
                };
            } else {
                obj = value[index]; 
                obj.sugerido += x.sugerido;
            }
            
            obj.percentual = (obj.sugerido / this.produtoTotal) * 100
            value.splice(index, (index == -1 ? 0 : 1), obj);
        });

        this.chartLiquidezData_Produto =  {
            labels: value.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-'),
            datasets: [{
              label: value.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-'),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }
    setChartAtivo_Produto() {
        this.chartAtivoOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartAtivoOptions_Produto.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var oi = ctx[0].element.$context.raw
                    return 'R$ ' + oi.sugerido;
                },
            }
        };
        this.chartAtivoOptions_Produto.parsing = { key: 'percentual' };
        var value: any[] = [];
        var obj;
        
        // this.showProdutoAtivo = value && value.length > 0;

        
        this.planner.planejamentoProduto.forEach(x => {
            var index = value.findIndex(y => x.produto.tipoAtivo_Id == y.tipoAtivo_Id);
            if (index == -1) {
                obj = {
                    tipoAtivo_Id: x.produto.tipoAtivo ?x.produto.tipoAtivo_Id : 0,
                    tipoAtivo: x.produto.tipoAtivo ?x.produto.tipoAtivo : undefined,
                    sugerido: x.sugerido,
                    label: x.produto.tipoAtivo ?x.produto.tipoAtivo.nome : '-'
                };
            } else {
                obj = value[index]; 
                obj.sugerido += x.sugerido;
            }
            
            obj.percentual = (obj.sugerido / this.produtoTotal) * 100
            value.splice(index, (index == -1 ? 0 : 1), obj);
        });

        this.chartAtivoData_Produto =  {
            labels: value.map(x =>  x.tipoAtivo ? x.tipoAtivo.nome : '-'),
            datasets: [{
              label: value.map(x =>  x.tipoAtivo ? x.tipoAtivo.nome : '-'),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }

    setChartRisco_Investimento() {
        this.chartRiscoOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartRiscoOptions_Investimento.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var item = ctx[0].element.$context.raw
                    return 'R$ ' + item.montanteAtual;
                },
            }
        };
        this.chartRiscoOptions_Investimento.parsing = { key: 'percentual' };
        var value: any[] = [];
        var obj;
        
        // this.showInvestimentoRisco = value && value.length > 0;
        console.log('investimentos', this.planner.planejamentoInvestimento);
        console.log('value 1', value);
        this.planner.planejamentoInvestimento.forEach(investimento => {
            console.log('investimento', investimento);
            var index = value.findIndex(y => investimento.investimento.tipoRisco_Id == y.tipoRisco_Id);
            console.log('value 2', value);
            console.log('index', index);
            if (index == -1) {
                obj = {
                    tipoRisco_Id: investimento.investimento.tipoRisco ? investimento.investimento.tipoRisco_Id : 0,
                    tipoRisco: investimento.investimento.tipoRisco ? investimento.investimento.tipoRisco : undefined,
                    montanteAtual: investimento.montanteAtual,
                    label: investimento.investimento.tipoRisco ? investimento.investimento.tipoRisco.nome : '-'
                };
            } else {
                obj = value[index]; 
                obj.montanteAtual += investimento.montanteAtual;
            }
            
            obj.percentual = (obj.montanteAtual / this.investimentoTotal) * 100;
            console.log('obj', obj);
            console.log('investimentoTotal', this.investimentoTotal);
            value.splice(index, (index == -1 ? 0 : 1), obj);
            console.log('value 3', value);
        });

        this.chartRiscoData_Investimento =  {
            labels: value.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
            datasets: [{
              label: value.map(x => x.tipoRisco ? x.tipoRisco.nome : '-'),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }
    setChartLiquidez_Investimento() {
        this.chartLiquidezOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartLiquidezOptions_Investimento.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var item = ctx[0].element.$context.raw
                    return 'R$ ' + item.montanteAtual;
                },
            }
        };
        this.chartLiquidezOptions_Investimento.parsing = { key: 'percentual' };
        var value: any[] = [];
        var obj;

        // this.showInvestimentoLiquidez = value && value.length > 0;

        this.planner.planejamentoInvestimento.forEach(x => {
            var index = value.findIndex(y => x.investimento.tipoLiquidez_Id == y.tipoLiquidez_Id);
            if (index == -1) {
                obj = {
                    tipoLiquidez_Id: x.investimento.tipoLiquidez ? x.investimento.tipoLiquidez_Id : 0,
                    tipoLiquidez: x.investimento.tipoLiquidez ? x.investimento.tipoLiquidez : undefined,
                    montanteAtual: x.montanteAtual,
                    label: x.investimento.tipoLiquidez ? x.investimento.tipoLiquidez.nome : '-'
                };
            } else {
                obj = value[index]; 
                obj.montanteAtual += x.montanteAtual;
            }
            
            obj.percentual = (obj.montanteAtual / this.investimentoTotal) * 100
            value.splice(index, (index == -1 ? 0 : 1), obj);
        });

        this.chartLiquidezData_Investimento =  {
            labels: value.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-    '),
            datasets: [{
              label: value.map(x => x.tipoLiquidez ? x.tipoLiquidez.nome : '-    '),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }
    setChartAtivo_Investimento() {
        this.chartAtivoOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        this.chartAtivoOptions_Investimento.plugins.tooltip = {
            callbacks: {
                afterBody: (ctx) => {
                    var item = ctx[0].element.$context.raw
                    return 'R$ ' + item.montanteAtual;
                },
            }
        };
        this.chartAtivoOptions_Investimento.parsing = { key: 'percentual' };
        
        var value: any[] = [];
        var obj;

        // // this.showInvestimentoAtivo = value && value.length > 0;

        this.planner.planejamentoInvestimento.forEach(x => {
            var index = value.findIndex(y => x.investimento.tipoAtivo_Id == y.tipoAtivo_Id);
            if (index == -1) {
                obj = {
                    tipoAtivo_Id: x.investimento.tipoAtivo_Id,
                    tipoAtivo: x.investimento.tipoAtivo,
                    montanteAtual: x.montanteAtual,
                    label: x.investimento.tipoAtivo.nome
                };
            } else {
                obj = value[index]; 
                obj.montanteAtual += x.montanteAtual;
            }
            
            obj.percentual = (obj.montanteAtual / this.investimentoTotal) * 100
            value.splice(index, (index == -1 ? 0 : 1), obj);
        });

        this.chartAtivoData_Investimento =  {
            labels: value.map(x => x.tipoAtivo.nome),
            datasets: [{
              label: value.map(x => x.tipoAtivo.nome),
              data: value,
              backgroundColor: this.colors,
              hoverOffset: 4
            }]
        };
    }


}
