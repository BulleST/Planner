import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarLinhaFluxosPontuaisComponent } from './adicionar-linha-fluxos-pontuais/adicionar-linha-fluxos-pontuais.component';
import { AdicionarLinhaInvestimentoComponent } from './adicionar-linha-investimento/adicionar-linha-investimento.component';
import { AdicionarLinhaPrincipaisObjetivosComponent } from './adicionar-linha-principais-objetivos/adicionar-linha-principais-objetivos.component';
import { AdicionarLinhaProdutoComponent } from './adicionar-linha-produto/adicionar-linha-produto.component';
import { DeleteLinhaFluxosPontuaisComponent } from './delete-linha-fluxos-pontuais/delete-linha-fluxos-pontuais.component';
import { DeleteLinhaInvestimentoComponent } from './delete-linha-investimento/delete-linha-investimento.component';
import { DeleteLinhaPrincipaisObjetivosComponent } from './delete-linha-principais-objetivos/delete-linha-principais-objetivos.component';
import { DeleteLinhaProdutoComponent } from './delete-linha-produto/delete-linha-produto.component';
import { InvestimentoComponent } from './investimento.component';
import { RelatorioPreviewComponent } from './relatorio-preview/relatorio-preview.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  {
    path: '', component: InvestimentoComponent, children: [
      { path: 'adicionar-produto', component: AdicionarLinhaProdutoComponent },
      { path: 'remover-produto/:investimento_id', component: DeleteLinhaProdutoComponent },
      { path: 'adicionar-investimento', component: AdicionarLinhaInvestimentoComponent },
      { path: 'remover-investimento/:investimento_id', component: DeleteLinhaInvestimentoComponent },
      { path: 'adicionar-objetivo', component: AdicionarLinhaPrincipaisObjetivosComponent },
      { path: 'remover-objetivo/:investimento_id', component: DeleteLinhaPrincipaisObjetivosComponent },
      { path: 'adicionar-fluxo-pontual', component: AdicionarLinhaFluxosPontuaisComponent },
      { path: 'remover-fluxo-pontual/:investimento_id', component: DeleteLinhaFluxosPontuaisComponent },
    ]
  },
  {
    path: 'relatorio', component: RelatorioComponent, children: [
      { path: ':blob', component: RelatorioPreviewComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestimentoRoutingModule { }
