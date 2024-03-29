import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { CarteiraSetup } from '../models/carteiraSetup.model';
import { CarteiraRiscoRel } from '../models/carteira-risco-rel.model';
import { Role } from '../models/account-perfil.model';
import { Account } from '../models/account.model';
import { AccountService } from './account.service';
import { UrlBackendService } from './url-backend.service';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetup[]>([]);
    objeto = new BehaviorSubject<CarteiraSetup>(new CarteiraSetup);
    empresa = new Empresa;
    account: Account = new Account;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private empresaService: EmpresaService,
        private accountService: AccountService,
        private urlBackendService: UrlBackendService,
    ) {
        this.urlBackendService.url.subscribe(res => this.url = res);
        this.empresa = this.empresaService.object;
        this.empresaService.empresa.subscribe(res => this.empresa = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }

    getObject(): BehaviorSubject<CarteiraSetup> {
        let e = localStorage.getItem('setup');
        if (!e) {
            this.setObject(new CarteiraSetup)
        } else {
            let obj = this.crypto.decrypt(e);
            obj.carteiraRiscoRel = !obj.carteiraRiscoRel || !obj.carteiraRiscoRel.length ? [] : obj.carteiraRiscoRel;
            obj.carteiraProdutoRel = !obj.carteiraProdutoRel || !obj.carteiraProdutoRel.length ? [] : obj.carteiraProdutoRel;
            obj.ativo = obj.dataDesativado == undefined || obj.dataDesativado == null || !obj.dataDesativado  || !obj.dataDesativado.trim();
            this.objeto.next(obj);
        }

        return this.objeto;
    }

    setObject(value: CarteiraSetup) {
        value.ativo = value.dataDesativado == undefined || value.dataDesativado == null || !value.dataDesativado  || !value.dataDesativado.toString().trim();
        value.carteiraRiscoRel = !value.carteiraRiscoRel || !value.carteiraRiscoRel.length ? [] : value.carteiraRiscoRel;
        value.carteiraProdutoRel = !value.carteiraProdutoRel || !value.carteiraProdutoRel.length ? [] : value.carteiraProdutoRel;
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }

    add_To_Empresa_List(item: CarteiraSetup) {
        if (this.empresa) {
            let existe = this.empresa.carteiraSetup.find(x => x.nome.toLowerCase() == item.nome.toLowerCase() && x.id != item.id && x.empresa_Id == item.empresa_Id);
            if (existe) {
                this.toastr.error('Setup já cadastrado nessa empresa.');
                return false;
            }

            if (item.carteiraProdutoRel.length == 0) {
                this.toastr.error('Insira produtos nesse setup.');
                return false;
            }

            item.carteiraProdutoRel.map(x => {
                x.carteiraSetup_Id = 0;
                return x
            })

            this.empresa.carteiraSetup.sort((x, y) => y.id - y.id);
            let lastId = this.empresa.carteiraSetup.length > 0 ? this.empresa.carteiraSetup[this.empresa.carteiraSetup.length - 1].id : 0;
            item.id = ++lastId;
            item.ativo = true;
            item.registroNaoSalvo = true;

            this.empresa.carteiraSetup.push(item);
            this.empresaService.setObject(this.empresa, 'add_To_Empresa_List')
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: CarteiraSetup) {
        if (this.empresa) {
            let index = this.empresa.carteiraSetup.findIndex(x => x.id == item.id);
            if (index == -1) {
                this.toastr.error('Setup não encontrado.');
                return false;
            }
            let existe = this.empresa.carteiraSetup.find(x => x.nome.toLowerCase() == item.nome.toLowerCase() && x.id != item.id && x.empresa_Id == item.empresa_Id);
            if (existe) {
                this.toastr.error('Setup já cadastrado nessa empresa.');
                return false;
            }
            if (item.carteiraProdutoRel.length == 0) {
                this.toastr.error('Insira produtos nesse setup.');
                return false;
            }
            if (item.id == 0) {
                this.empresa.carteiraSetup.sort((x, y) => y.id - y.id);
                let lastId = this.empresa.carteiraSetup.length > 0 ? this.empresa.carteiraSetup[this.empresa.carteiraSetup.length - 1].id : 0;
                item.id = ++lastId;
            }
            item.ativo = true;

            var list = this.empresa.carteiraSetup ?? [];
            list.splice(index, 1, item);
            this.empresa.carteiraSetup = list;
            this.empresaService.setObject(this.empresa, 'edit_To_Empresa_List');

            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    delete_To_Empresa_List(id: number) {
        let index = this.empresa.carteiraSetup.findIndex(x => x.id == id)
        if (index == -1) {
            this.toastr.error('Registro não encontrado!!')
            return false;
        }
        this.empresa.carteiraSetup.splice(index, 1);
        this.empresaService.setObject(this.empresa, 'delete_To_Empresa_List');

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

    getList(empresaId?: number, ativo?: any) {
        this.table.loading.next(true);
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        ativo = ativo != undefined ? ativo : '';
        return this.http.get<CarteiraSetup[]>(`${this.url}/carteiraSetup/all/${empresaId}/${ativo}`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(map(list => {
                list = list.map(x => {
                    x.ativo = x.dataDesativado != undefined ? false : true;
                    return x;
                })
                this.list.next(list);
                return list;
            })
        );
    }

    get(id: number) {
        return this.http.get<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) })
            .pipe(map(item => {
                this.setObject(item);
                item.ativo = item.dataDesativado != undefined ? false : true;
                return item;
            }));
    }

    create(request: CarteiraSetup) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.post<CarteiraSetup>(`${this.url}/carteiraSetup/${empresaId}`, request);
    }

    edit(request: CarteiraSetup) {
        return this.http.put<CarteiraSetup>(`${this.url}/carteiraSetup/`, request);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.url}/carteiraSetup/${id}`);
    }

    deactivated(id: number, active: boolean) {
        return this.http.patch<void>(`${this.url}/carteiraSetup/${id}/${active}`, {});
    }

}
