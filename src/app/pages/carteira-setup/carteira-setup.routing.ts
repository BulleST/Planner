import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeleteRelComponent } from './delete-rel/delete-rel.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MaxPercentualRiscoGuard } from './max-percentual-risco.guard';
import { RiscoComponent } from './risco/risco.component';

const routes: Routes = [
    { path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar carteira ', children: [
        { path: 'risco', component: RiscoComponent, canActivate: [ MaxPercentualRiscoGuard ] },
        { path: 'risco/:object', component: RiscoComponent, canActivate: [ MaxPercentualRiscoGuard ] },
    ] },
    { path: 'editar/:setup_id', component: EditComponent },
    { path: 'editar', component: EditComponent, children: [
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: 'risco', component: RiscoComponent, canActivate: [ MaxPercentualRiscoGuard ] },
        { path: 'risco/:object', component: RiscoComponent, canActivate: [ MaxPercentualRiscoGuard ] },
    ] },
    { path: '', component: ListComponent, children: [
        { path: 'excluir/:setup_id', component: DeleteComponent },
        { path: 'excluir-rel/:setup_id/:rel_id', component: DeleteRelComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteiraSetupRoutingModule { }
