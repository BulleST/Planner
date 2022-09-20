import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetupService } from 'src/app/services/setup.service';

@Injectable({
    providedIn: 'root'
})
export class MaxPercentualRiscoGuard implements CanActivate {
    carteiraSetup: CarteiraRequest = new CarteiraRequest;
    constructor(
        private setupService: CarteiraSetupService
    ) {
        this.setupService.getObject().subscribe(res => {
            this.carteiraSetup = res;
            this.carteiraSetup.carteiraRiscoRel = this.carteiraSetup.carteiraRiscoRel ? this.carteiraSetup.carteiraRiscoRel : []; 
        })

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let maxPercentual = 100;
        let percentuais = this.carteiraSetup.carteiraRiscoRel.map(x => x.percentual)
        if (percentuais) {
            maxPercentual = 100 - this.carteiraSetup.carteiraRiscoRel.map(x => x.percentual).reduce((x,y) => x+y);
        }


        return maxPercentual > 0;
    }

}
