import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/models/account-perfil.model';
import { CreateComponent } from './create/create.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserEditableAuth } from './user-editable.guard';

const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'Planner - Usuários', children: [
            { path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar usuário' },
            { path: 'editar/:usuario_id', component: EditComponent, title: 'Planner - Editar usuário', canActivate: [UserEditableAuth] },
            { path: 'excluir/:usuario_id', component: DeleteComponent, title: 'Planner - Excluir usuário', canActivate: [UserEditableAuth] },
            { path: 'reset-password/:usuario_id', component: ResetPasswordComponent, title: 'Planner - Resetar senha', canActivate: [UserEditableAuth] },
            { path: 'habilitar/:usuario_id', component: DeactivatedComponent, title: 'Planner - Habilitar usuário', canActivate: [UserEditableAuth] },
            { path: 'desabilitar/:usuario_id', component: DeactivatedComponent, title: 'Planner - Desabilitar usuário', canActivate: [UserEditableAuth] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
