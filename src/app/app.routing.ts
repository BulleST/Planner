import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { InitialComponent } from './parts/initial/initial.component';
import { MyAccountComponent } from './parts/my-account/my-account.component';
import { ResetPasswordComponent } from './parts/reset-password/reset-password.component';

const account = () => import('./pages/account/account.module').then(res => res.AccountModule);
const clientes = () => import('./pages/clientes/clientes.module').then(res => res.ClientesModule);
const empresas = () => import('./pages/empresas/empresas.module').then(res => res.EmpresasModule);
const investimento = () => import('./pages/investimento/investimento.module').then(res => res.InvestimentoModule);
const usuarios = () => import('./pages/usuarios/usuarios.module').then(res => res.UsuariosModule);

const routes: Routes = [
  { path: '', redirectTo: 'investimento', pathMatch: 'full' },
  {
    path: '', component: InitialComponent, /*canActivate: [AuthGuard], */children: [

      { path: 'investimento', loadChildren: investimento },
      { path: 'clientes', loadChildren: clientes },
      { path: 'empresas', loadChildren: empresas },
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
