import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.accountService.accountValue) {
            this.toastr.error('Acesso não autorizado. Faça login.');
            this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url } })
            this.accountService.setAccount(undefined)
            return false;
        }
        return true;
    }

}
