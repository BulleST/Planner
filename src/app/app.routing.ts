import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './router-guards/auth.guard';

const account = () => import('./pages/account/account.module').then(res => res.AccountModule);
const loggedIn = () => import('./pages/logged-in/logged-in.module').then(res => res.LoggedInModule);

const routes: Routes = [
    { path: '', loadChildren: loggedIn, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: account },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
