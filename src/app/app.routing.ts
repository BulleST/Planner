import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { InitialComponent } from './parts/initial/initial.component';
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
    path: '', component: InitialComponent,/*canActivate: [AuthGuard], */ children: [

        { path: 'percentual-risco', loadChildren: percentualRisco },
        { path: 'carteira-setup', loadChildren: setup },
        { path: 'clientes', loadChildren: clientes },
        { path: 'empresas', loadChildren: empresas },
        { path: 'produtos', loadChildren: produtos },
        { path: 'usuarios', loadChildren: usuarios },

      { path: 'my-account', component: MyAccountComponent },
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
