import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crypto } from '../utils/crypto';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Planejamento } from '../models/planejamento.model';
import { PlanejamentoAgregandoValor } from '../models/planejamento-agregandoValor.model';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';
import { Role } from '../models/account-perfil.model';

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
        private empresaService: EmpresaService
    ) { 
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
        this.empresaService.empresa.subscribe(res => this.empresa = res);
    }

    getObject(): BehaviorSubject<Planejamento> {
        let e = localStorage.getItem('planejamento');
        if (!e) {
            this.setObject(new Planejamento)
        } else {
            let obj = this.crypto.decrypt(e);
            this.objeto.next(obj);
        }
        return this.objeto;
    }

    setObject(value: Planejamento) {
        console.log(value)
        value.planejamentoAgregandoValor = value.planejamentoAgregandoValor ?? new PlanejamentoAgregandoValor; 
        localStorage.setItem('planejamento', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    getList() {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.get<Planejamento[]>(`${this.url}/planejamento/all/${empresaId}`)
        .pipe(map(list => {
            this.list.next(list);
            return list;
        }));
    }
    getByClienteId(cliente_id: number) {
        return this.http.get<Planejamento>(`${this.url}/planejamento/${cliente_id}`).pipe(map(item => {
            item.principaisObjetivos = item.principaisObjetivos ? item.principaisObjetivos : [];
            item.planejamentoAgregandoValor = item.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : item.planejamentoAgregandoValor 
            this.setObject(item);
            return item;
        }));
    }
    send(request: Planejamento) {
        return this.http.post<Planejamento>(`${this.url}/planejamento/`, request);
    }
    create(request: Planejamento) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        request.cliente.empresa_Id = empresaId;
        request.account_Id = this.account.id;
        request.cliente.usuario_Id = this.account.id;
        return this.http.post<Planejamento>(`${this.url}/planejamento/`, request).pipe(map(item => {
            item.planejamentoAgregandoValor = item.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : item.planejamentoAgregandoValor 
            return item;
        }));
    }
    edit(request: Planejamento) {
        return this.http.put<Planejamento>(`${this.url}/planejamento/`, request).pipe(map(item => {
            item.planejamentoAgregandoValor = item.planejamentoAgregandoValor == null ? new PlanejamentoAgregandoValor : item.planejamentoAgregandoValor 
            return item;
        }));
    }
    delete(id: number) {
        return this.http.delete<void>(`${this.url}/planejamento/${id}`);
    }
}
