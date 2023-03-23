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
import { Produto, ProdutoRequest } from '../models/produto.model';
import { Account } from '../models/account.model';
import { AccountService } from './account.service';
import { Role } from '../models/account-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    url = environment.url;
    list = new BehaviorSubject<Produto[]>([]);
    objeto = new BehaviorSubject<Produto | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<Produto[]>([]);
    empresa = new Empresa;
    account: Account = new Account;

    constructor(
        private router: Router,
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
        private accountService: AccountService,
    ) {
        this.empresaService.empresa.subscribe(res => this.empresa = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }

    getObject() {
        var e = localStorage.getItem('produto')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new Produto)
        }
        return this.objeto;
    }

    setObject(value: Produto) {
        localStorage.setItem('produto', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
    }

    add_To_Empresa_List(item: Produto) {
        if (this.empresa) {
            var list = this.empresa.produto ?? [];

            let tipoAtivo = this.dropdownService.tipoAtivo.value.find(x => x.id == item.tipoAtivo_Id);
            if (!tipoAtivo) {
                this.toastr.error('Selecione um tipo de ativo válido!!');
                return false;
            }
            item.tipoAtivo = tipoAtivo;

            let tipoRisco = this.dropdownService.tipoRisco.value.find(x => x.id == item.tipoRisco_Id);
            if (!tipoRisco) {
                this.toastr.error('Selecione um tipo de risco válido!!');
                return false;
            }
            item.tipoRisco = tipoRisco;

            let tipoLiquidez = this.dropdownService.tipoLiquidez.value.find(x => x.id == item.tipoLiquidez_Id);
            if (!tipoLiquidez) {
                this.toastr.error('Selecione um tipo de liquidez válido!!');
                return false;
            }
            item.tipoLiquidez = tipoLiquidez;

            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            item.registroNaoSalvo = true;

            let a = Object.assign({}, item)
            list.push(a);
            this.empresa.produto = list;
            this.empresaService.setObject(this.empresa, 'add_To_Empresa_List');
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: Produto) {
        if (this.empresa) {
            var list = this.empresa.produto ?? [];
            let index = list.findIndex(x => x.id == item.id);
            if (index != -1) {
             
                let tipoAtivo = this.dropdownService.tipoAtivo.value.find(x => x.id == item.tipoAtivo_Id);
                if (!tipoAtivo) {
                    this.toastr.error('Selecione um tipo de ativo válido!!');
                    return false;
                }
                item.tipoAtivo = tipoAtivo;
                let tipoRisco = this.dropdownService.tipoRisco.value.find(x => x.id == item.tipoRisco_Id);
                if (!tipoRisco) {
                    this.toastr.error('Selecione um tipo de risco válido!!');
                    return false;
                }
                item.tipoRisco = tipoRisco;
                let tipoLiquidez = this.dropdownService.tipoLiquidez.value.find(x => x.id == item.tipoLiquidez_Id);
                if (!tipoLiquidez) {
                    this.toastr.error('Selecione um tipo de liquidez válido!!');
                    return false;
                }
                item.tipoLiquidez = tipoLiquidez;

                let produto = Object.assign({}, item)
                list.splice(index, 1, produto);
                this.empresa.produto = list;
                this.empresaService.setObject(this.empresa, 'edit_To_Empresa_List');
                this.toastr.success('Operação concluída');
                return true;
            } else {
                this.toastr.error('Produto não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            var list = this.empresa.produto ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.produto = list;
                this.empresaService.setObject(this.empresa, 'delete_To_Empresa_List');
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Produto não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    getList(empresaId?: number) {
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        return this.http.get<Produto[]>(`${this.url}/produto/all/${empresaId}`).pipe(
            map(list => {
                list = list.map(x => {
                    x.ativo = !x.dataDesativado;
                    return x;
                });
                this.list.next(list);
                return list;
            })
        );
    }

    get(id: number){
        return this.http.get<Produto>(`${this.url}/produto/${id}`);
    }

    create(request: ProdutoRequest) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.post<Produto>(`${this.url}/produto/${empresaId}`, request);
    }

    edit(request: ProdutoRequest) {
        return this.http.put<Produto>(`${this.url}/produto/`, request);
    }

    deactivated(id: number, active: boolean) {
        return this.http.patch<void>(`${this.url}/produto/${id}/${active}`, {});
    }

    delete(id: number) {
        return this.http.delete<Produto>(`${this.url}/produto/${id}`);
    }

}
