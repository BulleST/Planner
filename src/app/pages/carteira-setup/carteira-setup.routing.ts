import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar carteira ' },
    { path: 'editar/:setup_id', component: EditComponent, title: 'Planner - Cadastrar carteira ' },
    {
        path: '', component: ListComponent, children: [
            { path: 'excluir/:setup_id', component: DeleteComponent, title: 'Planner - Excluir carteira ' },
            {
                path: 'habilitar/:setup_id',
                component: DeactivatedComponent,
                title: 'Planner - Habilitar carteira'
            },
            {
                path: 'desabilitar/:setup_id',
                component: DeactivatedComponent,
                title: 'Planner - Desabilitar carteira'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarteiraSetupRoutingModule { }
