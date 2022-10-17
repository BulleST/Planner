import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { PlannerService } from 'src/app/services/planner.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Injectable({
  providedIn: 'root'
})
export class ProdutoGuard implements CanActivate {
  constructor(
    private modal: ModalOpen,
    private alert: AlertService,
    private plannerService: PlannerService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let planner = this.plannerService.getObject().value;
        if (!planner.carteiraSetup) {
            this.modal.voltar();
            this.alert.warn('Escolha um setup para adicionar um produto!');
            return false;
        } else if (planner.planejamentoInvestimento.length == 0) {
            this.modal.voltar();
            this.alert.warn('Insira um produto para cadastrar um investimento!');
            return false;
        }
        return true;
  }
  
}
