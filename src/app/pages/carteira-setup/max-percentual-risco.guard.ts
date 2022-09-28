import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { CarteiraSetupService } from 'src/app/services/setup.service';

@Injectable({
    providedIn: 'root'
})
export class MaxPercentualRiscoGuard implements CanActivate {
    carteiraSetup: CarteiraSetup = new CarteiraSetup;
    constructor(
        private setupService: CarteiraSetupService
    ) {
        this.setupService.getObject().subscribe(res => {
            this.carteiraSetup = res;
        })

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
        // return this.setupService.getObject().value.percentualDisponivelRisco > 0;
        return true;
    }

}
