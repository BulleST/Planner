import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix', },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
