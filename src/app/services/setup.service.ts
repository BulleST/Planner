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
import { CarteiraRiscoRel } from '../models/carteira-risco-rel.model';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetup[]>([]);
    objeto = new BehaviorSubject<CarteiraRequest>(new CarteiraRequest);
    empresa = new Empresa;
    percentualDisponivelRisco = new BehaviorSubject<number>(100);
    percentualTotalRisco = new BehaviorSubject<number>(0);
    percentualTotalProduto = new BehaviorSubject<number>(0);

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
        let e = localStorage.getItem('setup');
        if (!e) {
            this.setObject(new CarteiraRequest)
        } else {
            let obj = this.crypto.decrypt(e);
            obj.carteiraRiscoRel = !obj.carteiraRiscoRel || !obj.carteiraRiscoRel.length ? [] : obj.carteiraRiscoRel;
            obj.carteiraProdutoRel = !obj.carteiraProdutoRel || !obj.carteiraProdutoRel.length ? [] : obj.carteiraProdutoRel;
            this.objeto.next(obj);
        }

        let obj = this.objeto.value;
        if (obj.carteiraRiscoRel.length > 0) {
            let total = obj.carteiraRiscoRel.map(x => x.percentual).reduce((x,y) => x+y);
            this.percentualTotalRisco.next(total);
            this.percentualDisponivelRisco.next(100-total);
        } else {
            this.percentualTotalRisco.next(0);
            this.percentualDisponivelRisco.next(100);
        }

        
        if (obj.carteiraProdutoRel.length > 0) {
            let total = obj.carteiraProdutoRel.map(x => x.percentual).reduce((x,y) => x+y);
            this.percentualTotalProduto.next(total);
        } else {
            this.percentualTotalProduto.next(0);
        }

        return this.objeto;
    }

    setObject(value: CarteiraRequest) {
        value.carteiraRiscoRel = !value.carteiraRiscoRel || !value.carteiraRiscoRel.length ? [] : value.carteiraRiscoRel;
        value.carteiraProdutoRel = !value.carteiraProdutoRel || !value.carteiraProdutoRel.length ? [] : value.carteiraProdutoRel;
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
        if (value.carteiraRiscoRel.length > 0) {
            let total = value.carteiraRiscoRel.map(x => x.percentual).reduce((x,y) => x+y);
            this.percentualTotalRisco.next(total);
            this.percentualDisponivelRisco.next(100-total);
        } else {
            this.percentualTotalRisco.next(0);
            this.percentualDisponivelRisco.next(100);
        }
    }

    
    excluirRisco(objeto: CarteiraRiscoRel) {
        let carteiraSetup = this.getObject().value;
        let index = carteiraSetup.carteiraRiscoRel.findIndex(x => x.tipoRisco_Id == objeto.tipoRisco_Id);
        if (index) {
            carteiraSetup.carteiraRiscoRel.splice(index, 1);
            this.setObject(carteiraSetup)
        }
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
