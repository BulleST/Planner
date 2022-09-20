import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { CarteiraProdutoRel, CarteiraRequest } from '../models/carteira-produto-rel';
import { CarteiraSetup } from '../models/carteiraSetup.model';
import { AlertService } from '../parts/alert/alert.service';
import { ProdutoTributacaoRel } from '../models/produto-tributacao-rel.model';
import { MaskApplierService } from 'ngx-mask';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetup[]>([]);
    objeto = new BehaviorSubject<CarteiraRequest>(new CarteiraRequest);
    empresa = new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private empresaService: EmpresaService,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.empresa = res;
        });
    }

    getObject(): BehaviorSubject<CarteiraRequest> {
        let e = localStorage.getItem('setup')
        if (!e) {
            this.setObject(new CarteiraRequest)
        } else {
            this.objeto.next(this.crypto.decrypt(e))
        }
        return this.objeto;
    }

    setObject(value: CarteiraRequest) {
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }
   
    getList(empresa_Id: number = 1) {
        return this.http.get<CarteiraSetup[]>(`${this.url}/carteiraSetup/all/${empresa_Id}`).pipe(
            map(list => {
                this.list.next(list);
                return list;
            })
        );
    }


    get(id: number){
        return this.http.get<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`)
        .pipe(map(item => {
            this.setObject(item);
            return item;
        }));
    }

    create(request: CarteiraRequest) {
        return this.http.post<CarteiraSetup>(`${this.url}/carteiraSetup/`, request);
    }

    edit(request: CarteiraRequest) {
    }

    delete(model: CarteiraRequest) {
    }

}
