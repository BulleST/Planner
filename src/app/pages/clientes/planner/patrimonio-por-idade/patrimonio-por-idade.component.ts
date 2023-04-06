import { AfterViewInit, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlannerService } from 'src/app/services/planner.service';
import { Colors } from 'src/app/utils/colors.enum';

@Component({
  selector: 'app-patrimonio-por-idade',
  templateUrl: './patrimonio-por-idade.component.html',
  styleUrls: ['./patrimonio-por-idade.component.css']
})
export class PatrimonioPorIdadeComponent implements OnInit, AfterViewInit, OnChanges {

    chartPatrimonioIdadeData: any;
    chartPatrimonioIdadeOptions: any;
    @ViewChild('chartPatrimonioIdade') private chartPatrimonioIdade;
    
    @Input() planner: Planejamento = new Planejamento;
    
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


  constructor(
    private plannerService: PlannerService,
    ) { 
    this.plannerService.getObject().subscribe(res => {
        this.planner = res;
        this.setChartPatrimonioIdade();
    });
}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['planner']) {
            this.planner = changes['planner'].currentValue;

            if (this.planner.planejamentoGrafico.length > 0)
                this.setChartPatrimonioIdade();
        }

    }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.setChartWidth('chart-capital-segurado');
      this.setChartWidth('chart-patrimonio-idade');
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

  setChartPatrimonioIdade() {
      this.setChartWidth('chart-patrimonio-idade');
      this.planner.planejamentoGrafico.sort((x, y) => x.idade - y.idade)
      this.chartPatrimonioIdadeData = {
          labels: this.planner.planejamentoGrafico.map(x => x.idade),
          // labels: Array.from({length: 18}, (_, i) => i * 5), // int[]
          datasets: [
              {
                  type: 'line',
                  label: 'Planejado',
                  // data: Array.from({length: 18}, (_, i) => parseInt((Math.random() * (80 - 0) + 0).toString())),// int[]
                  data: this.planner.planejamentoGrafico.map(x => x.valorPlanejado),
                  backgroundColor: '#242424',
                  borderColor: '#2424247a'
              },
              {
                  type: 'bar',
                  label: 'Realidade Atual',
                  // data: Array.from({length: 18}, (_, i) => parseInt((Math.random() * (80 - 0) + 0).toString())),// int[]
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
                  display: true,
                  title: {
                      text: 'Idade',
                      display: true,
                      align: 'start',
                      font: {
                          weight: 'bold'
                      }
                  }
              },
              yAxes: {
                  title: {
                      text: 'Valor',
                      display: true,
                      align: 'start',
                      font: {
                          weight: 'bold'
                      }
                  }

              }  
          },
      };
  }

}
