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

    excludeUrls = [
        'tributacao/getAll',
        'tipoLiquidez/getAll',
        'tipoRisco/getAll',
        'tipoAtivo/getAll',
        'perfilAcesso/getAll',
        'perfilInvestidor/getAll',
        'estadoCivil/getAll',
    ]
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var a = this.excludeUrls.filter(x => request.url.includes(x));
        if (a.length == 0) {
          this.table.loading.next(true);
        }
        this.table.resetSelection();
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.type == 0) {
                    
                } else {
                    this.table.loading.next(false);
                    if ([200, 204, 201].includes(data.status) && (request.method == 'POST' || request.method == 'DELETE' || request.method == 'PUT')) {
                        if (request.method == 'POST') {
                            var a = this.excludeUrls.filter(x => request.url.includes(x));
                            if (a.length == 0) {
                                this.toastr.success('Operação concluída com sucesso');
                            }
                        }
                        if (request.method == 'DELETE') {
                            this.toastr.success('Registro excluído com sucesso');
                        }
                        if (request.method == 'PUT') {
                            this.toastr.success('Registro atualizado com sucesso');
                        }
                    }
                }
                return of(data);
            }),
            catchError(err => {
                console.error(err);
                this.table.loading.next(false);
                this.toastr.error('Ocorreu um erro no processamento da requisição');
                this.alert.error(err.error.message);
                return throwError(err);
            }),
        );
    }
}
