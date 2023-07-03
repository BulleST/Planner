import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { FormInvestimentoComponent } from './planner/form-investimento/form-investimento.component';
import { FormProdutoComponent } from './planner/form-produto/form-produto.component';
import { ProdutoGuard } from './planner/produto.guard';
import { DeletePlannerComponent } from './planner/delete-planner/delete-planner.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar cliente' },
        { path: 'editar/:cliente_id', component: EditComponent, title: 'Planner - Editar cliente' },
        { path: 'excluir/:cliente_id', component: DeleteComponent, title: 'Planner - Excluir cliente' },
        { path: 'habilitar/:cliente_id', component: DeactivatedComponent, title: 'Planner - Habilitar cliente'},
        { path: 'desabilitar/:cliente_id', component: DeactivatedComponent, title: 'Planner - Desabilitar cliente' },
    ]},
    { path: 'planner', component: PlannerComponent, title: 'Planner - Planejamento', children: [
        { path: 'investimento', component: FormInvestimentoComponent },
        { path: 'produto', component: FormProdutoComponent, canActivate: [ProdutoGuard] },
        { path: 'excluir/:planner_id', component: DeletePlannerComponent },
    ] },
    { path: 'planner/:cliente_id', component: PlannerComponent, children: [
        { path: 'investimento', component: FormInvestimentoComponent },
        { path: 'produto', component: FormProdutoComponent, canActivate: [ProdutoGuard] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
