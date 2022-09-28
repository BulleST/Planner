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
import { CarteiraProdutoRel } from '../models/carteira-produto-rel';
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
    objeto = new BehaviorSubject<CarteiraSetup>(new CarteiraSetup);
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

    getObject(): BehaviorSubject<CarteiraSetup> {
        let e = localStorage.getItem('setup');
        if (!e) {
            this.setObject(new CarteiraSetup)
        } else {
            let obj = this.crypto.decrypt(e);
            obj.carteiraRiscoRel = !obj.carteiraRiscoRel || !obj.carteiraRiscoRel.length ? [] : obj.carteiraRiscoRel;
            obj.carteiraProdutoRel = !obj.carteiraProdutoRel || !obj.carteiraProdutoRel.length ? [] : obj.carteiraProdutoRel;
            this.objeto.next(obj);
        }

        return this.objeto;
    }

    setObject(value: CarteiraSetup) {
        value.carteiraRiscoRel = !value.carteiraRiscoRel || !value.carteiraRiscoRel.length ? [] : value.carteiraRiscoRel;
        value.carteiraProdutoRel = !value.carteiraProdutoRel || !value.carteiraProdutoRel.length ? [] : value.carteiraProdutoRel;
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    add_To_Empresa_List(carteiraSetup: CarteiraSetup) {
        let index = this.empresa.carteiraSetup.findIndex(x => x.empresa_Id == carteiraSetup.empresa_Id
            && (x.nome.toLowerCase() == carteiraSetup.nome.toLowerCase()));


        if (index != -1) {
            this.toastr.error('Essa carteira já está cadastrada para essa empresa!!')
            return false;
        }

        this.empresa.carteiraSetup.sort((x, y) => y.id - y.id);
        let lastId = this.empresa.carteiraSetup.length > 0 ? this.empresa.carteiraSetup[this.empresa.carteiraSetup.length - 1].id : 0;
        carteiraSetup.id = ++lastId;

        this.empresa.carteiraSetup.push(carteiraSetup);
        this.empresaService.setObject(this.empresa)
        this.toastr.success('Operação concluída');
        this.table.resetSelection();
        return true;
    }

    edit_To_Empresa_List(carteiraSetup: CarteiraSetup) {
        let index = this.empresa.carteiraSetup.findIndex(x => x.empresa_Id == carteiraSetup.empresa_Id
            && x.nome.toLowerCase() == carteiraSetup.nome.toLowerCase()
            && x.id != carteiraSetup.id)

        if (index != -1) {
            this.toastr.error('Essa carteira já está cadastrada para essa empresa!!')
            return false;
        }
        index = this.empresa.carteiraSetup.findIndex(x => x.id == carteiraSetup.id)
        if (index != -1) {
            this.toastr.error('Registro não encontrado!!')
            return false;
        }
        this.empresa.carteiraSetup.splice(index, 1, carteiraSetup);
        this.empresaService.setObject(this.empresa);

        this.toastr.success('Operação concluída');
        this.table.resetSelection();
        return true;
    }

    delete_To_Empresa_List(id: number) {
        let index = this.empresa.carteiraSetup.findIndex(x => x.id == id)
        if (index != -1) {
            this.toastr.error('Registro não encontrado!!')
            return false;
        }
        this.empresa.carteiraSetup.splice(index, 1);
        this.empresaService.setObject(this.empresa);

        this.toastr.success('Operação concluída');
        this.table.resetSelection();
        return true;
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


    get(id: number) {
        return this.http.get<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`)
            .pipe(map(item => {
                this.setObject(item);
                return item;
            }));
    }

    create(request: CarteiraSetup) {
        return this.http.post<CarteiraSetup>(`${this.url}/carteiraSetup/`, request);
    }
    
    edit(request: CarteiraSetup) {
        return this.http.put<CarteiraSetup>(`${this.url}/carteiraSetup/${request.id}`, request);
    }
    
    delete(id: number) {
        return this.http.delete<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`);
    }

}
