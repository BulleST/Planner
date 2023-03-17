import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: CreateComponent },
        { path: 'editar/:usuario_id', component: EditComponent },
        { path: 'excluir/:usuario_id', component: DeleteComponent },
        { path: 'reset-password/:usuario_id', component: ResetPasswordComponent },
        {
            path: 'habilitar/:usuario_id',
            component: DeactivatedComponent,
            title: 'Planner - Habilitar usuário'
        },
        {
            path: 'desabilitar/:usuario_id',
            component: DeactivatedComponent,
            title: 'Planner - Desabilitar usuário '
        },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
