import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from '../parts/alert/alert.service';
import { EmpresaService } from '../services/empresa.service';

@Injectable({
  providedIn: 'root'
})
export class CarteiraSetupGuard implements CanActivate {
  constructor(
    private empresaService: EmpresaService,
    private toastr: ToastrService,
    private alert: AlertService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // var obj = this.empresaService.objeto.value;
        // if (obj && obj.produto.length > 0) {
        //     return true;
        // } else {
        //     this.toastr.info('Você precisa adicionar produtos a essa empresa antes de cadastrar o carteira setup');
        //     // this.alert.info('Você precisa adicionar produtos a essa empresa antes de cadastrar o carteira setup', { keepAfterRouteChange: true});
        //     return false;
        // }

        return true;
  }
  
}
