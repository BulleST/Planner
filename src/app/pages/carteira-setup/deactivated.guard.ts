import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, Observable } from 'rxjs';
import { CarteiraSetupService } from 'src/app/services/setup.service';

@Injectable({
    providedIn: 'root'
})
export class DeactivatedGuard implements CanActivate {
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private setupService: CarteiraSetupService,
    ) {
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
        var habilitar = route.data['ativo'];
        var setup = this.setupService.getObject().value;

        
        return new Observable<boolean>(obs => {
            this.setupService.getObject().subscribe(res => {
                if (res) {
                    if (habilitar == setup.ativo) {
                        obs.next(false);
                        this.router.navigate(['carteira-setup']);
                        this.toastr.error('Não foi possível acessar essa operação');
                    }
                    obs.next(true);
                } else {
                    obs.next(false);
                    this.router.navigate(['carteira-setup']);
                    this.toastr.error('Não foi possível acessar essa operação');
                }
            })
        })
    }

}
