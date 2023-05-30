import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crypto } from '../utils/crypto';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Planejamento } from '../models/planejamento.model';
import { PlanejamentoAgregandoValor } from '../models/planejamento-agregandoValor.model';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';
import { Role } from '../models/account-perfil.model';
import { Table } from '../utils/table';

@Injectable({
    providedIn: 'root'
})
export class PlannerService {
    list = new BehaviorSubject<Planejamento[]>([]);
    url = environment.url;
    objeto = new BehaviorSubject<Planejamento>(new Planejamento);
    empresa = new Empresa;
    account = new Account;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
        private accountService: AccountService,
        private empresaService: EmpresaService,
        private table: Table,
    ) {
        this.empresa = this.empresaService.object;
        this.empresaService.empresa.subscribe(res => this.empresa = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }

    getObject(): BehaviorSubject<Planejamento> {
        let e = localStorage.getItem('planejamento');
        if (!e) {
            this.setObject(new Planejamento)
        } else {
            let obj = this.crypto.decrypt(e);
            this.objeto.next(obj);
        }
        console.log('getObject', this.objeto.value)
        return this.objeto;
    }

    setObject(value: Planejamento) {
        console.log('setObject', value)
        value.planejamentoAgregandoValor = value.planejamentoAgregandoValor ?? new PlanejamentoAgregandoValor;
        localStorage.setItem('planejamento', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    getList() {
        this.table.loading.next(true);
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.get<Planejamento[]>(`${this.url}/planejamento/all/${empresaId}`)
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        x.cliente.ativo = !x.cliente.dataDesativado;
                        return x;
                    });
                    this.list.next(list);
                    return of(list);
                },
                complete: () => {
                    this.table.loading.next(false)
                }
            }));
    }

    getByClienteId(cliente_id: number) {
        return this.http.get<Planejamento>(`${this.url}/planejamento/${cliente_id}`).pipe(map(planner => {
            console.log('getByClienteId res', planner)
            planner.principaisObjetivos = planner.principaisObjetivos ? planner.principaisObjetivos : [];
            planner.planejamentoAgregandoValor = planner.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : planner.planejamentoAgregandoValor
            this.setObject(planner);
            return planner;
        }));
    }

    create(request: Planejamento) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        request.cliente.empresa_Id = empresaId;
        request.account_Id = this.account.id;
        request.cliente.account_Id = this.account.id;
        return this.http.post<Planejamento>(`${this.url}/planejamento/`, request)
            .pipe(map(res => {
                res.planejamentoAgregandoValor = res.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : res.planejamentoAgregandoValor
                this.setObject(res);
                return res;
            }));
    }
    edit(request: Planejamento) {
        return this.http.put<Planejamento>(`${this.url}/planejamento/`, request)
            .pipe(map(res => {
                res.planejamentoAgregandoValor = res.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : res.planejamentoAgregandoValor
                this.setObject(res);
                return res;
            }));
    }
    delete(id: number) {
        return this.http.delete<void>(`${this.url}/planejamento/${id}`);
    }
}
