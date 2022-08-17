import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CapacidadeRiscoTemp } from 'src/app/models/capacidadeRisco-temp.model';
import { Cliente } from 'src/app/models/cliente.model';
import { estadoCivil, EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PrincipaisObjetivos } from 'src/app/models/objetivos.model';
import { PerfilInvestidor, perfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { PlanejamentoInvestimento } from 'src/app/models/planejamento-investimento.model';
import { PlanejamentoProduto } from 'src/app/models/planejamento-produto.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { PDFService } from 'src/app/services/pdf.service';
import { Colors } from 'src/app/utils/colors.enum';
import { Crypto } from 'src/app/utils/crypto';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { ModoEscuro } from 'src/app/utils/modo-escuro';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrls: ['./investimento.component.css']
})
export class InvestimentoComponent implements OnInit, AfterContentChecked {

  faArrowRight = faArrowRight;
  faTrash = faTrash;
  faPlus = faPlus;
  loading = false;

  calculos = [
    { id: 0, baixissimo: 50, baixo: 50, moderado: 50, arrojado: 50, superArrojado: 50, hedge: 50, total: 0, tipo: 'Sugestão' },
    { id: 1, baixissimo: 50, baixo: 50, moderado: 50, arrojado: 50, superArrojado: 50, hedge: 50, total: 0, tipo: 'Plano' },
  ];

  ativos = {
    imoveis: 0,
    veiculos: 0,
    outrosBens: 0,
    investimentos: 0,
    total: 0,
  }

  passivos = {
    imoveis: 0,
    veiculos: 0,
    cartaoCredito: 0,
    outrasDividas: 0,
    total: 0,
  }

  dependentes = [
    { id: 0, nome: '', gastoAnual: 0, tempo: 0 },
    { id: 0, nome: '', gastoAnual: 0, tempo: 0 },
    { id: 0, nome: '', gastoAnual: 0, tempo: 0 },
  ]

  seguro = [
    {
      titulo: 'Morte Qualquer Causa (MQC)', capitalSegurado: 0, children: [
        { titulo: 'Invetário (Vit.)	São Paulo', capitalSegurado: 0 },
        { titulo: 'Dívidas (Temp. Decresc.)	', capitalSegurado: 0 },
        { titulo: 'Dependentes (Temp. Decresc.)	', capitalSegurado: 0 },
        { titulo: '5 anos de despesa (MQC)	', capitalSegurado: 0 },
      ]
    },
    {
      titulo: 'Diária por Incapacidade Temporária', capitalSegurado: null, children: [
        { titulo: 'por acidente e doença', capitalSegurado: 0 },
        { titulo: 'apenas por acidente', capitalSegurado: 0 },
      ]
    },
    { titulo: 'Morte Acidental', capitalSegurado: 0, children: null },
    { titulo: 'Assistência Funerária', capitalSegurado: 0, children: null },
    { titulo: 'Responsabilidade Cívil', capitalSegurado: 0, children: null },
    { titulo: 'Prêmio adequado (5% da renda)', capitalSegurado: 0, children: null },
  ];

  dadosSeguroVida = {
    altura: 0,
    peso: 0,
    imc: 0,
    estadoCivil: 0,
    dataNascimento: new Date,
    cpf: '',
    rg: '',
    email: '',
  }

  estadoCivil: EstadoCivil[] = estadoCivil;

  carteira = [
    { tipo: 'Atual', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
    { tipo: 'Sugerida', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
    { tipo: 'Diferença', rentabilidadeAtual: 0, retornoAnual: 0, retornoMensal: 0, patrimonioMaximo: 0, tempo: 0, },
  ];

  
  cliente: Cliente = new Cliente;
  _perfilInvestidor: PerfilInvestidor[] = perfilInvestidor;
  planejamento: Planejamento = new Planejamento;
  principaisObjetivos: PrincipaisObjetivos[] = []
  investimentos: PlanejamentoInvestimento[] = [];
  produtos: PlanejamentoProduto[] = [];
  risco: CapacidadeRiscoTemp = new CapacidadeRiscoTemp;
  fluxosPontuais: FluxosPontuais[] = []


  modoEscuroAtivado = false;
  patrimonioPorIdade: any;
  patrimonioPorIdade_options: any;

  capitalSegurado: any;
  capitalSegurado_options: any;

  constructor(
    private modoEscuro: ModoEscuro,
    private pdfService: PDFService,
    private investimentoService: InvestimentoService,
    private crypto: Crypto,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {
    this.dadosSeguroVida.imc = this.calcularIMC(this.dadosSeguroVida);
    this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);

    this.investimentoService.list_Planejamento_Investimento.subscribe(res => this.investimentos = res);
    this.investimentoService.list_Planejamento_Produto.subscribe(res => this.produtos = res);
    this.investimentoService.list_PrincipaisObjetivos.subscribe(res => this.principaisObjetivos = res);
    this.investimentoService.list_FluxosPontuais.subscribe(res => this.fluxosPontuais = res);

    this.patrimonioPorIdade = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Atual',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          type: 'bar',
          label: 'Planejado',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.patrimonioPorIdade_options = {
      plugins: {
        title: {
          display: true,
          text: 'Patrimônio por Idade',
          font: {
            size: 26
          },
          color: Colors.primary
        },
        subtitle: {
          display: true,
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
    };
    this.capitalSegurado = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Renda Interrompida 0 anos antes',
          data: [39, 52, 36, 47, 14, 55, 74],
        },
        {
          type: 'bar',
          label: 'Capital Segurado',
          data: [74, 65, 87, 19, 25, 25, 25],
        },
        {
          type: 'bar',
          label: 'Planejado',
          data: [28, 48, 40, 19, 86, 27, 90],
        }
      ]
    }

    this.capitalSegurado_options = {
      plugins: {
        title: {
          display: true,
          text: 'Capital Segurado x Evolução Patrimonial',
          font: {
            size: 26
          },
          color: Colors.primary
        },
        legend: {
          position: 'top'
        }
      },
    };
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
  
    // this.sampleViewModel.DataContext = this.DataContext;
    // this.sampleViewModel.Position = this.Position;
    this.cdref.detectChanges();
  
  }
  calcularIMC(obj: any) {
    var imc = obj.peso / (obj.altura ^ 2);
    return imc;
  }
  deleteInvestimento(id: number) {
    this.router.navigate(['investimento', 'remover-investimento', this.crypto.encrypt(id)])
  }
  deleteProduto(id: number) {
    this.router.navigate(['investimento', 'remover-produto', this.crypto.encrypt(id)])
  }

  deleteObjetivo(id: number) {
    this.router.navigate(['investimento', 'remover-objetivo', this.crypto.encrypt(id)])
  }

  deleteFluxoPontual(id: number) {
    this.router.navigate(['investimento', 'remover-fluxo-pontual', this.crypto.encrypt(id)])
  }

  arrowUp(value: number) {
    return arrowUp(value)
  }
  arrowDown(value: number, allowNegative: boolean = false) {
    return arrowDown(value, allowNegative)
  }
}
