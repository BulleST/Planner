import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';

@Component({
    selector: 'app-grafico-comparativo',
    templateUrl: './grafico-comparativo.component.html',
    styleUrls: ['./grafico-comparativo.component.css']
})
export class GraficoComparativoComponent implements OnInit, OnChanges {

    @Input() open: boolean = true;
    @Input() investimentos: PlanejamentoInvestimento[] = [];
    @Input() produtos: PlanejamentoProduto[] = [];


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

    constructor() { 
        this.chartOptions = {
            plugins: {
                // title: {
                //     display: true,
                //     text: '',
                //     font: {
                //         size: 14
                //     },
                //     color: '#3f3c3c'
                // },
                // subtitle: {
                //     text: '',
                //     font: {
                //         size: 12
                //     },
                //     color: '#3f3c3c'
                // },
                legend: {
                    position: 'bottom'
                    // display: false
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

    ngOnInit(): void {
        this.setChartRisco_Investimento();
        this.setChartLiquidez_Investimento();
        this.setChartAtivo_Investimento();
        this.setChartRisco_Produto();
        this.setChartLiquidez_Produto();
        this.setChartAtivo_Produto();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open']) {
            this.open = changes['open'].currentValue;
            // this.open = true;
            this.setChartRisco_Investimento();
            this.setChartLiquidez_Investimento();
            this.setChartAtivo_Investimento();
            this.setChartRisco_Produto();
            this.setChartLiquidez_Produto();
            this.setChartAtivo_Produto();
        }

        if (changes['investimentos'])
            this.investimentos = changes['investimentos'].currentValue;

    }

    voltar() {
        setTimeout(() => {
            this.open = false;
        }, 300);
    }

    setChartRisco_Investimento() {
        console.log(this)
        let riscos: TipoRisco[] = [];
        this.investimentos.map((i: PlanejamentoInvestimento, index: number )=> {
            var indexRisco = riscos.findIndex(x => x.id == i.investimento.tipoRisco_Id);
            if (index != -1) {
                
            } else {
                riscos.push(i.investimento.tipoRisco);
            }
            return i
        })
        console.log(riscos)
        this.chartRiscoOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartRiscoOptions_Investimento.plugins.title.text = 'Investimento';
        // this.chartRiscoOptions_Investimento.plugins.title.position = 'left'
        this.chartRiscoData_Investimento =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }
    setChartLiquidez_Investimento() {
        this.chartLiquidezOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartLiquidezOptions_Investimento.plugins.title.text = '';
        // this.chartLiquidezOptions_Investimento.plugins.title.position = 'left'
    
        this.chartLiquidezData_Investimento =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: ['My First Dataset'],
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }
    setChartAtivo_Investimento() {
        this.chartAtivoOptions_Investimento = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartAtivoOptions_Investimento.plugins.title.text = '';
        // this.chartAtivoOptions_Investimento.plugins.title.position = 'left'
    
        this.chartAtivoData_Investimento =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: ['My First Dataset'],
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }

    setChartRisco_Produto() {
        console.log(this)
        let riscos: TipoRisco[] = [];
        this.produtos.map((i: PlanejamentoProduto, index: number )=> {
            var indexRisco = riscos.findIndex(x => x.id == i.produto.tipoRisco_Id);
            if (index != -1) {
                
            } else {
                riscos.push(i.produto.tipoRisco);
            }
            return i
        })
        console.log(riscos)
        this.chartRiscoOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartRiscoOptions_Produto.plugins.title.text = 'Produto';
        // this.chartRiscoOptions_Produto.plugins.title.position = 'left'
        this.chartRiscoData_Produto =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }
    setChartLiquidez_Produto() {
        this.chartLiquidezOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartLiquidezOptions_Produto.plugins.title.text = '';
        // this.chartLiquidezOptions_Produto.plugins.title.position = 'left'
    
        this.chartLiquidezData_Produto =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: ['My First Dataset'],
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }
    setChartAtivo_Produto() {
        this.chartAtivoOptions_Produto = JSON.parse(JSON.stringify(this.chartOptions));
        // this.chartAtivoOptions_Produto.plugins.title.text = '';
        // this.chartAtivoOptions_Produto.plugins.title.position = 'left'
    
        this.chartAtivoData_Produto =  {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: ['My First Dataset'],
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
    }
}
