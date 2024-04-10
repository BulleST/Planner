import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlBackendService } from './url-backend.service';
import { PercentualRisco } from '../models/percentual-risco.model';
import { Account } from '../models/account.model';
import { AccountService } from './account.service';
import { Role } from '../models/account-perfil.model';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class PercentualRiscoService {
    url = environment.url;
    list = new BehaviorSubject<PercentualRisco[]>([]);
    account: Account = new Account;
    empresa = new Empresa;

    constructor(
        private http: HttpClient,
        private urlBackendService: UrlBackendService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        this.urlBackendService.url.subscribe(res => this.url = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
        this.empresa = this.empresaService.object;
        this.empresaService.empresa.subscribe(res => this.empresa = res);
    }

    getAll(empresaId?: number) {
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        return this.http.get<PercentualRisco[]>(`${this.url}/percentual-risco/all/${empresaId}`)
            .pipe(map(list => {
                this.list.next(list);
                return list;
            }));
    }

    create(empresaId?: number) {
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        return this.http.post<PercentualRisco[]>(`${this.url}/percentual-risco/${empresaId}`, {})
        .pipe(map(list => {
            this.list.next(list);
            return list;
        }));
    }

    edit(list: PercentualRisco[]) {
        return this.http.put<PercentualRisco[]>(`${this.url}/percentual-risco/`, list)
        .pipe(map(list => {
            this.list.next(list);
            return list;
        }));
    }



}
