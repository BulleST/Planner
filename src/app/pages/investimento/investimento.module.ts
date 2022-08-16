import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestimentoRoutingModule } from './investimento.routing';
import { InvestimentoComponent } from './investimento.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioPreviewComponent } from './relatorio-preview/relatorio-preview.component';
import { AdicionarLinhaInvestimentoComponent } from './adicionar-linha-investimento/adicionar-linha-investimento.component';
import { AdicionarLinhaProdutoComponent } from './adicionar-linha-produto/adicionar-linha-produto.component';
import { DeleteLinhaInvestimentoComponent } from './delete-linha-investimento/delete-linha-investimento.component';
import { DeleteLinhaProdutoComponent } from './delete-linha-produto/delete-linha-produto.component';
import { AdicionarLinhaPrincipaisObjetivosComponent } from './adicionar-linha-principais-objetivos/adicionar-linha-principais-objetivos.component';
import { DeleteLinhaPrincipaisObjetivosComponent } from './delete-linha-principais-objetivos/delete-linha-principais-objetivos.component';
import { DeleteLinhaFluxosPontuaisComponent } from './delete-linha-fluxos-pontuais/delete-linha-fluxos-pontuais.component';
import { AdicionarLinhaFluxosPontuaisComponent } from './adicionar-linha-fluxos-pontuais/adicionar-linha-fluxos-pontuais.component';


@NgModule({
  declarations: [
    InvestimentoComponent,
    RelatorioComponent,
    RelatorioPreviewComponent,
    AdicionarLinhaInvestimentoComponent,
    AdicionarLinhaProdutoComponent,
    DeleteLinhaInvestimentoComponent,
    DeleteLinhaProdutoComponent,
    AdicionarLinhaPrincipaisObjetivosComponent,
    DeleteLinhaPrincipaisObjetivosComponent,
    DeleteLinhaFluxosPontuaisComponent,
    AdicionarLinhaFluxosPontuaisComponent
  ],
  imports: [
    CommonModule,
    InvestimentoRoutingModule,
    FormsModule,
    TableModule,
    FontAwesomeModule,
    ToastrModule,
    NgxMaskModule.forChild(),
    HttpClientModule,
    ChartModule,
    
  ]
})
export class InvestimentoModule { }
