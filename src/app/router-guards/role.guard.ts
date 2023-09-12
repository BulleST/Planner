import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let account = this.accountService.accountValue;
        if (!account) {
            console.log('role guard if', account)
            this.toastr.error('Acesso não autorizado. ');
            this.toastr.error('Faça login. ');
            this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url } })
            return false;
        } else if (route.data['roles'] && !route.data['roles'].includes(account?.role)) {
            console.log('role guard else if', account)
            this.toastr.error('Acesso não autorizado.1');
            this.router.navigate([''])
            return false;
        }
        return true;
    }


}

