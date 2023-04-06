import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Table } from '../utils/table';
import { AlertService } from '../parts/alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
        private table: Table,
        private alert: AlertService,
        private activatedRoute: ActivatedRoute,
    ) { }

    excludeUrlsToastr = [
        'tributacao/getAll',
        'tipoLiquidez/getAll',
        'tipoRisco/getAll',
        'tipoAtivo/getAll',
        'perfilAcesso/getAll',
        'perfilInvestidor/getAll',
        'estadoCivil/getAll',
        'accounts/revoke-token',
        'accounts/authenticate',
        'accounts/refresh-token',
        'accounts/verify-email',
        'accounts/register',
        'accounts/get-login',
        'accounts/authenticate',
        'accounts/is-logged',
    ]
    excludeUrlsLoading = [
        'tributacao/getAll',
        'tipoLiquidez/getAll',
        'tipoRisco/getAll',
        'tipoAtivo/getAll',
        'perfilAcesso/getAll',
        'perfilInvestidor/getAll',
        'estadoCivil/getAll',
        'accounts/verify-email',
        'accounts/refresh-token',
    ]
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var notLoading = this.excludeUrlsLoading.filter(x => request.url.includes(x));
        var notToastr = this.excludeUrlsToastr.filter(x => request.url.includes(x));

        if (notLoading.length == 0) {
            this.table.loading.next(true);
        }

        this.table.resetSelection();
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.type == 0) {
                    // request in progress
                }
                else {
                    this.table.loading.next(false);
                    if ([200, 204, 201].includes(data.status)
                        && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
                        if (notToastr.length == 0) {
                            if (request.method == 'POST') {
                                this.toastr.success('Operação concluída com sucesso');
                            }
                            if (request.method == 'DELETE') {
                                this.toastr.success('Registro excluído com sucesso');
                            }
                            if (request.method == 'PUT') {
                                this.toastr.success('Registro atualizado com sucesso');
                            }
                        }
                    }
                }
                return of(data);
            }),
            catchError(err => {
                console.error(err);
                this.table.loading.next(false);
                if (!request.url.includes('accounts/is-logged')) {
                    if (err.status == 401) {
                        
                        var returnUrl = window.location.pathname;
                        returnUrl = returnUrl.includes('account/login') ? '' : returnUrl; 
                        console.log(returnUrl)
                        this.router.navigate(['account', 'login'], { queryParams: { returnUrl }})
                        localStorage.clear();
                        if (notToastr.length == 0) {
                            this.toastr.error('Faça login')
                            this.toastr.error('Acesso não autorizado.');
                        }

                    }
                    else if (err.status == 403) {
                        this.toastr.error('Permissão negada.');
                    }
                    else {
                        this.toastr.error('Ocorreu um erro no processamento da requisição.');
                        if (err.statusText.includes('Unkown Error')) {
                            this.toastr.error("Não foi possível localizar a causa do erro.");
                        } else {
                            this.toastr.error(err.error.message ?? err.message);
                        }
                    }
                }
                return throwError(err);
                // return throwError(() => new Error(err));
            }),
        );
    }
}
