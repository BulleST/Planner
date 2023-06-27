import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from '../utils/table';
import { LoadingService } from '../parts/loading/loading';
import { getError } from '../utils/error';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private table: Table,
        private loadingUtils: LoadingService,
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
    ];


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
        '/empresa/',
    ]

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var notLoading = this.excludeUrlsLoading.filter(x => request.url.includes(x));
        var notToastr = this.excludeUrlsToastr.filter(x => request.url.includes(x));

        const started = Date.now();
        let ok: string;

        if (notLoading.length == 0)
            this.loadingUtils.loading.next(true);
            
        this.table.resetSelection();

        return next.handle(request).pipe(
            tap({
                next: (data: any) => {
                    if (data.type == 0) {
                        // request in progress
                    }
                    else if (data instanceof HttpResponse) {
                        if ([200, 204, 201].includes(data.status)
                            && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
                            if (notToastr.length == 0) {
                                if (request.method == 'POST') this.toastr.success('Operação concluída com sucesso');
                                if (request.method == 'DELETE') this.toastr.success('Registro excluído com sucesso');
                                if (request.method == 'PUT') this.toastr.success('Registro atualizado com sucesso');
                            }
                        }
                    }
                },
                error: res => {
                    console.error('error', res);
                    var msg  = getError(res);

                    if (res.status == 401) {
                        var returnUrl = window.location.pathname;
                        returnUrl = returnUrl.includes('account/login') ? '' : returnUrl;
                        this.router.navigate(['account', 'login'], { queryParams: { returnUrl } });
                        localStorage.clear();
                        if (notToastr.length == 0) {
                            this.toastr.error('Faça login')
                            this.toastr.error('Acesso não autorizado.');
                        }
                    }
                    else if (res.status == 403) {
                        this.toastr.error('Permissão negada.');
                    }
                    else {
                        this.toastr.error(msg);
                    }

                    ok = 'failed'
                    return throwError(() => new Error(msg));

                }
            }),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${request.method} "${request.urlWithParams}"
                    ${ok} in ${elapsed} ms.`;

                this.table.loading.next(false)
                this.loadingUtils.loading.next(false);
            }),
        );
    }
}
