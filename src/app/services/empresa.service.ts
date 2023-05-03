import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Table } from '../utils/table';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);
	private empresaObject: BehaviorSubject<Empresa>;
    public empresa: Observable<Empresa>;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
        private table: Table
    ) {
		this.empresaObject = new BehaviorSubject<Empresa>(new Empresa);
		this.empresa = this.empresaObject.asObservable();
    }
    public get object()  {
        var e = localStorage.getItem('empresa') as string;
        if (e && e.trim()) {
            this.setObject(this.crypto.decrypt(e) as Empresa, 'object')
        }
        return this.empresaObject.value;
    }

    setObject(value: Empresa, where: string) {
        localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        this.empresaObject.next(value);
    }

    getList() {
        return this.http.get<Empresa[]>(`${this.url}/empresa/`)
        .pipe(map(list => {
            list = list.map(x => {
                x.ativo = !x.dataDesativado;
                return x;
            });
            this.list.next(list);
            this.table.loading.next(false); //Colocando aqui pq no interceptor não funciona 
            return list;
        }));;
    }

    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`)
        .pipe(map(item => {
            this.setObject(item, 'get');
            this.table.loading.next(false); //Colocando aqui pq no interceptor não funciona 
            return item;
        }));
    }

    create(request: Empresa) {
        return this.http.post<Empresa>(`${this.url}/empresa/`, request);
    }

    edit(request: Empresa) {
        request.account = [];
        request.carteiraSetup = [];
        request.cliente = [];
        request.produto = [];
        request.percentualRisco = [];
        return this.http.put<Empresa>(`${this.url}/empresa/`, request);
    }

    deactivated(id: number, active: boolean) {
        return this.http.patch<void>(`${this.url}/empresa/${id}/${active}`, {});
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.url}/empresa/${id}`);
    }
}
