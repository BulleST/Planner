import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    url = environment.url;
    list = new BehaviorSubject<Usuario[]>([]);
    objeto = new BehaviorSubject<Usuario | undefined>(undefined);
    empresa = new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.empresa = res;
        });
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
                this.toastr.error('E-mail já foram cadastrados!!');
                return false;
            }

            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            item.registroNaoSalvo = true;
            
            list.push(item);
            this.empresa.account = list;
            this.empresaService.setObject(this.empresa);
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
                this.empresaService.setObject(this.empresa);
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
                this.empresaService.setObject(this.empresa);
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

    getList(empresa_Id: number) {
        return this.http.get<Usuario[]>(`${this.url}/usuario/all/${empresa_Id}`);
    }

    get(id: number) {
        return this.http.get<Usuario>(`${this.url}/usuario/${id}`);
    }

    create(request: Usuario) {
        return this.http.post(`${this.url}/usuario/`, request);
    }

    edit(request: Usuario) {
        return this.http.put(`${this.url}/usuario`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/usuario/${id}`);
    }

    deactivated(id: number, ativo?: boolean) {
        return this.http.patch(`${this.url}/usuario/${id}/${ativo}`, {});
    }
}
