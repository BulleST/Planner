import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crypto } from '../utils/crypto';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Planejamento } from '../models/planejamento.model';

@Injectable({
    providedIn: 'root'
})
export class PlannerService {
    list = new BehaviorSubject<Planejamento[]>([]);
    url = environment.url;
    objeto = new BehaviorSubject<Planejamento>(new Planejamento);
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
        localStorage.setItem('planejamento', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    getList(empresa_id: number = 1) {
        return this.http.get<Planejamento[]>(`${this.url}/planejamento/all/${empresa_id}`)
        .pipe(map(list => {
            this.list.next(list);
            return list;
        }));
    } 
    
    get(id: number) {
        return this.http.get<Planejamento>(`${this.url}/planejamento/${id}`).pipe(map(item => {
            item.principaisObjetivos = item.principaisObjetivos ? item.principaisObjetivos : [];
            this.setObject(item);
            return item;
        }));
    }

    create(request: Planejamento) {
        return this.http.post<Planejamento>(`${this.url}/planejamento/`, request);
    }
    
    edit(request: Planejamento) {
        return this.http.put<Planejamento>(`${this.url}/planejamento/${request.id}`, request);
    }
    
    delete(id: number) {
        return this.http.delete<Planejamento>(`${this.url}/planejamento/${id}`);
    }

}
