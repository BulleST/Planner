import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { InvestimentoFormComponent } from './planner/investimento-form/investimento-form.component';
import { ListComponent } from './list/list.component';
import { ProdutoFormComponent } from './planner/produto-form/produto-form.component';
import { ProdutoGuard } from './produto.guard';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'excluir/:cliente_id', component: DeleteComponent },
    ]},
    { path: 'planner', component: PlannerComponent, children: [
        { path: 'investimento', component: InvestimentoFormComponent },
        { path: 'produto/:produto_id', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
        { path: 'produto', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
    ] },
    { path: 'planner/:planner_id', component: PlannerComponent, children: [
        { path: 'investimento', component: InvestimentoFormComponent },
        { path: 'produto/:produto_id', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
        { path: 'produto', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule { }
