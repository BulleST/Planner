import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { Role } from './models/account-perfil.model';
import { InitialComponent } from './parts/initial/initial.component';
import { MinhaEmpresaComponent } from './parts/minha-empresa/minha-empresa.component';
import { MyAccountComponent } from './parts/my-account/my-account.component';
import { ResetPasswordComponent } from './parts/reset-password/reset-password.component';

const account = () => import('./pages/account/account.module').then(res => res.AccountModule);
const clientes = () => import('./pages/clientes/clientes.module').then(res => res.ClientesModule);
const empresas = () => import('./pages/empresas/empresas.module').then(res => res.EmpresasModule);
const usuarios = () => import('./pages/usuarios/usuarios.module').then(res => res.UsuariosModule);
const produtos = () => import('./pages/produtos/produtos.module').then(res => res.ProdutosModule);
const setup = () => import('./pages/carteira-setup/carteira-setup.module').then(res => res.CarteiraSetupModule);
const percentualRisco = () => import('./pages/percentual-risco/percentual-risco.module').then(res => res.PercentualRiscoModule);

const routes: Routes = [
  {
    path: '', component: InitialComponent, /* canActivate: [AuthGuard], */ children: [

        { 
            path: 'percentual-risco', 
            loadChildren: percentualRisco, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Master]} 
        },
        { 
            path: 'carteira-setup', 
            loadChildren: setup, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Master]} 
        },
        { 
            path: 'clientes', 
            loadChildren: clientes, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Master, Role.Backoffice]} 
        },
        { 
            path: 'produtos', 
            loadChildren: produtos, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Master]} 
        },
        { 
            path: 'usuarios', 
            loadChildren: usuarios, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Master]} 
        },
        { 
            path: 'empresas', 
            loadChildren: empresas, 
            // canActivate: [RoleGuard], 
            // data: { roles: [Role.Admin]} 
        },
        
      { path: 'my-account', component: MyAccountComponent },
      { path: 'minha-empresa/:empresa_nome', component: MinhaEmpresaComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },

  { path: 'account', loadChildren: account },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
