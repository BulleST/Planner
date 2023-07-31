import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';
import { Role } from '../models/account-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    url = environment.url;
    list = new BehaviorSubject<Usuario[]>([]);
    objeto = new BehaviorSubject<Usuario | undefined>(undefined);
    empresa = new Empresa;
    account: Account = new Account;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
        private accountService: AccountService,
    ) {
        this.empresa = this.empresaService.object;
        this.empresaService.empresa.subscribe(res => this.empresa = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }

    getObject() {
        var e = localStorage.getItem('usuario')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new Usuario)
        }
        return this.objeto;
    }

    setObject(value: Usuario) {
        localStorage.setItem('usuario', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
    }

    add_To_Empresa_List(item: Usuario) {
        if (this.empresa) {
            var list = this.empresa.account ?? [];
            let perfilAcesso = this.dropdownService.perfilAcesso.value.find(x => x.id == item.perfilAcesso_Id);
            if (!perfilAcesso) {
                this.toastr.error('Selecione um perfil de acesso válido!!');
                return false;
            }
            item.perfilAcesso = perfilAcesso;

            let existe = this.empresa.account.find(x => x.email == item.email)
            if (existe) {
                this.toastr.error('Esse e-mail já foi cadastrado!!');
                return false;
            }

            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            item.registroNaoSalvo = true;
            
            list.push(item);
            this.empresa.account = list;
            this.empresaService.setObject(this.empresa, 'add_To_Empresa_List');
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: Usuario) {
        if (this.empresa) {
            var list = this.empresa.account ?? [];
            let index = list.findIndex(x => x.id == item.id);
            if (index != -1) {
                let perfilAcesso = this.dropdownService.perfilAcesso.value.find(x => x.id == item.perfilAcesso_Id);
                if (!perfilAcesso) {
                    this.toastr.error('Selecione um perfil de investidor válido!!');
                    return false;
                }
                item.perfilAcesso = perfilAcesso;

                let existe = this.empresa.account.find(x => x.email == item.email && x.id != item.id)
                if (existe) {
                    this.toastr.error('E-mail já foram cadastrados!!');
                    return false;
                }

                list.splice(index, 1, item);
                this.empresa.account = list;
                this.empresaService.setObject(this.empresa, 'edit_To_Empresa_List');
                this.toastr.success('Operação concluída');
                return true;
            } else {
                this.toastr.error('Usuario não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            var list = this.empresa.account ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.account = list;
                this.empresaService.setObject(this.empresa, 'delete_To_Empresa_List');
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Usuario não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    getList(empresaId?: number) {
        this.table.loading.next(true);
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        return this.http.get<Usuario[]>(`${this.url}/usuario/all/${empresaId}`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.ativo = !x.dataDesativado;
                    return x;
                });
                this.list.next(list);
                return of(list);
            }
        }));
    }

    get(id: number) {
        return this.http.get<Usuario>(`${this.url}/usuario/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: Usuario) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.post(`${this.url}/usuario/${empresaId}`, request);
    }

    edit(request: Usuario) {
        return this.http.put(`${this.url}/usuario`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/usuario/${id}`);
    }

    deactivated(id: number, ativo?: boolean) {
        return this.http.patch<Usuario>(`${this.url}/usuario/${id}/${ativo}`, {});
    }

    resetPassword(id: number) {
        return this.http.patch(`${this.url}/usuario/reset-password/${id}`, {});
    }
}
