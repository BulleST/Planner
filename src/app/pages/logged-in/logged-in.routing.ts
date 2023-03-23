import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/helpers/role.guard';
import { Role } from 'src/app/models/account-perfil.model';
import { InitialComponent } from './initial/initial.component';
import { MinhaEmpresaComponent } from './minha-empresa/minha-empresa.component';
import { MyAccountComponent } from './my-account/my-account.component';

const clientes = () => import('./../clientes/clientes.module').then(res => res.ClientesModule);
const empresas = () => import('./../empresas/empresas.module').then(res => res.EmpresasModule);
const usuarios = () => import('./../usuarios/usuarios.module').then(res => res.UsuariosModule);
const produtos = () => import('./../produtos/produtos.module').then(res => res.ProdutosModule);
const setup = () => import('./../carteira-setup/carteira-setup.module').then(res => res.CarteiraSetupModule);

const routes: Routes = [
    { path: '', component: InitialComponent, children: [
        { path: 'my-account', component: MyAccountComponent },
        { path: 'minha-empresa/:empresa_nome', component: MinhaEmpresaComponent },
        {
            path: 'carteira-setup',
            loadChildren: setup,
            canActivate: [RoleGuard],
            data: { roles: [ Role.Admin, Role.Master] }
        },
        { 
            path: 'clientes',
            loadChildren: clientes,
            canActivate: [RoleGuard],
            data: { roles: [ Role.Admin, Role.Master, Role.Backoffice] }
        },
        {
            path: 'produtos',
            loadChildren: produtos,
            canActivate: [RoleGuard],
            data: { roles: [ Role.Admin, Role.Master] }
        },
        {
            path: 'usuarios',
            loadChildren: usuarios,
            canActivate: [RoleGuard],
            data: { roles: [ Role.Admin, Role.Master] }
        },
        {
            path: 'empresas',
            loadChildren: empresas,
            canActivate: [RoleGuard],
            data: { roles: [ Role.Admin] }
        },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedInRoutingModule { }
