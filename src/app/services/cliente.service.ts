import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { Crypto } from '../utils/crypto';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    list = new BehaviorSubject<Cliente[]>([]);
    url = environment.url;
    objeto = new BehaviorSubject<Cliente>(new Cliente);
    empresa = new Empresa;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
        private empresaService: EmpresaService
    ) { 
        this.empresaService.empresaObject.subscribe(res => {
            this.empresa = res;
        });
    }

    getObject(): BehaviorSubject<Cliente> {
        let e = localStorage.getItem('cliente');
        if (!e) {
            this.setObject(new Cliente)
        } else {
            let obj = this.crypto.decrypt(e);
            this.objeto.next(obj);
        }

        return this.objeto;
    }

    setObject(value: Cliente) {
        localStorage.setItem('cliente', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    getList(empresa_id: number = 1) {
        return this.http.get<Cliente[]>(`${this.url}/cliente/all/${empresa_id}`)
        .pipe(map(list => {
            this.list.next(list);
            return list;
        }));
    } 
    
    get(id: number) {
        return this.http.get<Cliente[]>(`${this.url}/cliente/${id}`);
    }

    create(request: Cliente) {
        return this.http.post<Cliente>(`${this.url}/cliente/`, request);
    }
    
    edit(request: Cliente) {
        return this.http.put<Cliente>(`${this.url}/cliente/${request.id}`, request);
    }
    
    delete(id: number) {
        return this.http.delete<Cliente>(`${this.url}/cliente/${id}`);
    }

}
