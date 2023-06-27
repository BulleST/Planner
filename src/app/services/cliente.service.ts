import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { Crypto } from '../utils/crypto';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { DropdownService } from './dropdown.service';
import { Table } from '../utils/table';
import { Account } from '../models/account.model';
import { AccountService } from './account.service';
import { Role } from '../models/account-perfil.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    list = new BehaviorSubject<Cliente[]>([]);
    url = environment.url;
    objeto = new BehaviorSubject<Cliente>(new Cliente);
    empresa = new Empresa;
    account: Account = new Account;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
        private empresaService: EmpresaService,
        private dropdownService: DropdownService,
        private accountService: AccountService,
        private toastr: ToastrService,
        private table: Table,
    ) {
        this.empresa = this.empresaService.object;
        this.empresaService.empresa.subscribe(res => this.empresa = res);
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }
    
    getObject() {
        var e = localStorage.getItem('cliente')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new Cliente)
        }
        return this.objeto;
    }
    
    setObject(value: Cliente) {
        localStorage.setItem('cliente', this.crypto.encrypt(value) ?? '');
        this.objeto.next(value);
    }
    
    
    add_To_Empresa_List(item: Cliente) {
        if (this.empresa) {
            var list = this.empresa.cliente ?? [];
            let perfilInvestidor = this.dropdownService.perfilInvestidor.value.find(x => x.id == item.perfilInvestidor_Id);
            if (!perfilInvestidor) {
                this.toastr.error('Selecione um perfil de investidor válido!!');
                return false;
            }
            item.perfilInvestidor = perfilInvestidor;
            
            let estadoCivil = this.dropdownService.estadoCivil.value.find(x => x.id == item.estadoCivil_Id);
            if (!estadoCivil) {
                this.toastr.error('Selecione um estado civil válido!!');
                return false;
            }
            item.estadoCivil = estadoCivil;

            let existe = this.empresa.cliente.find(x => x.cpf == item.cpf || x.rg == item.rg)
            if (existe) {
                this.toastr.error('CPF ou RG já foram cadastrados!!');
                return false;
            }
            
            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            item.registroNaoSalvo = true;

            list.push(item);
            this.empresa.cliente = list;
            this.empresaService.setObject(this.empresa, 'add_To_Empresa_List');
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    
    edit_To_Empresa_List(item: Cliente) {
        if (this.empresa) {
            var list = this.empresa.cliente ?? [];
            let index = list.findIndex(x => x.id == item.id);
            if (index != -1) {
                let perfilInvestidor = this.dropdownService.perfilInvestidor.value.find(x => x.id == item.perfilInvestidor_Id);
                if (!perfilInvestidor) {
                    this.toastr.error('Selecione um perfil de investidor válido!!');
                    return false;
                }
                item.perfilInvestidor = perfilInvestidor;
                
                let estadoCivil = this.dropdownService.estadoCivil.value.find(x => x.id == item.estadoCivil_Id);
                if (!estadoCivil) {
                    this.toastr.error('Selecione um estado civil válido!!');
                    return false;
                }
                item.estadoCivil = estadoCivil;
                
                let existe = this.empresa.cliente.find(x => (x.cpf == item.cpf || x.rg == item.rg) && x.id != item.id)
                if (existe) {
                    this.toastr.error('CPF ou RG já foram cadastrados!!');
                    return false;
                }

                list.splice(index, 1, item);
                this.empresa.cliente = list;
                this.empresaService.setObject(this.empresa, 'edit_To_Empresa_List');
                this.toastr.success('Operação concluída');
                return true;
            } else {
                this.toastr.error('Cliente não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    
    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            var list = this.empresa.cliente ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.cliente = list;
                this.empresaService.setObject(this.empresa, 'delete_To_Empresa_List');
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Cliente não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    
    getList(empresaId?: number) {
        this.table.loading.next(true);
        empresaId = empresaId ?? (this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id);
        return this.http.get<Cliente[]>(`${this.url}/cliente/all/${empresaId}`)
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        x.ativo = !x.dataDesativado;
                        return x;
                    });
                    this.list.next(list);
                    return of(list);
                },
                complete: () => {
                    this.table.loading.next(false)
                }
            }));
    }

    get(id: number) {
        return this.http.get<Cliente>(`${this.url}/cliente/${id}`);
    }

    create(request: Cliente) {
        var empresaId = this.account.perfilAcesso_Id != Role.Admin ? this.account.empresa_Id : this.empresa.id;
        return this.http.post<Cliente>(`${this.url}/cliente/${empresaId}`, request);
    }

    edit(request: Cliente) {
        return this.http.put<Cliente>(`${this.url}/cliente/${request.id}`, request);
    }

    delete(id: number) {
        return this.http.delete<Cliente>(`${this.url}/cliente/${id}`);
    }

    deactivated(id: number, active: boolean) {
        return this.http.patch<void>(`${this.url}/cliente/${id}/${active}`, {});
    }
}
