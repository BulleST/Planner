import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { Produto } from '../models/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    url = environment.url;
    list = new BehaviorSubject<Produto[]>([]);
    objeto = new BehaviorSubject<Produto | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<Produto[]>([]);
    empresa?= new Empresa;

    constructor(
        private router: Router,
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService
    ) {
        this.empresaService.getObject().subscribe(res => {
            this.empresa = res;
        });

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
            if (item.tributacao.length == 0) {
                this.toastr.error('Selecione pelo menos uma tributação');
                return false;
            }

            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            list.push(item);
            this.empresa.produto = list;
            this.empresaService.objeto.next(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
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

                if (item.tributacao.length == 0) {
                    this.toastr.error('Selecione pelo menos uma tributação');
                    return false;
                }

                list.splice(index, 1, item);
                this.empresa.produto = list;
                this.empresaService.objeto.next(this.empresa);
                this.toastr.success('Operação concluída');
                return true;
            } else {
                this.toastr.error('Usuário não encontrado!!');
                return false;
            }
        }
        return false;
    }

    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            var list = this.empresa.produto ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.produto = list;
                this.empresaService.objeto.next(this.empresa);
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Usuário não encontrado!!');
                return false;
            }
        }
        return false;
    }



    getList() {
        return this.http.get<Produto[]>(`${this.url}/CarteiraSetupRequest/`);
    }

    get(id: number): BehaviorSubject<undefined | Produto> {
        if (this.list.value.length == 0) {
            return new BehaviorSubject<undefined | Produto>(undefined);
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject<undefined | Produto>(undefined);
        }

        var item = this.list.value[index];
        return new BehaviorSubject<undefined | Produto>(item);
    }

    create(request: Produto) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length - 1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: Produto) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: Produto) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
