import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpResponseBase, HttpHeaderResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
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
        private alert: AlertService
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
        'accounts/verify-email',
        'accounts/register',
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
    ]
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var a = this.excludeUrlsLoading.filter(x => request.url.includes(x));
        if (a.length == 0) {
          this.table.loading.next(true);
          console.log('oi')
        }

        this.table.resetSelection();
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.type == 0) {
                    // request in progress
                } 
                else {
                    console.log('tchau')
                    this.table.loading.next(false);
                    if ([200, 204, 201].includes(data.status) 
                        && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
                        var a = this.excludeUrlsToastr.filter(x => request.url.includes(x));
                        if (a.length == 0) {
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
                if (err.status == 401) {
                    if (!this.accountService.accountValue) {
                        this.toastr.error('Faça login')
                        this.router.navigate(['account', 'login']);
                    } 
                    this.toastr.error('Acesso não autorizado.');
                } else {
                    this.toastr.error('Ocorreu um erro no processamento da requisição.');
                    if (err.statusText.includes('Unkown Error')) {
                        this.toastr.error("Não foi possível localizar a causa do erro.");
                    } else {
                        this.toastr.error(err.error.message ?? err.message);
                    }
                }
                return throwError(err);
                // return throwError(() => new Error(err));
            }),
        );
    }
}
