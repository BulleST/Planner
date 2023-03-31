import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import jwt_decode from 'jwt-decode';

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
        const account = this.accountService.accountValue;


        if (!account) {
            this.toastr.error('Acesso não autorizado. Faça login.');
            console.log(state.url)
            this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url } })
            this.accountService.setAccount(undefined)
            return false;
        } else {
            const jwtToken = JSON.parse(atob(account?.jwtToken.split('.')[1]));
            console.log(jwtToken)
            const expires = new Date(jwtToken.exp * 1000);
            console.log(expires)
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            console.log(timeout)

            console.log(new Date() > expires)
            return true;
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
      }

}
