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
import { CarteiraSetupRequest } from '../models/carteiraSetup-produto.model';
import { CarteiraSetup } from '../models/carteiraSetup.model';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetupRequest[]>([]);
    objeto = new BehaviorSubject<CarteiraSetupRequest | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<CarteiraSetup[]>([]);
    empresa?= new Empresa;

    constructor(
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
        var e = localStorage.getItem('setup')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new CarteiraSetupRequest)
        }
        return this.objeto;
    }

    setObject(value: CarteiraSetupRequest) {
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
    }

    add_To_Empresa_List(item: CarteiraSetupRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação de produto e tributação.');
            return false;
        }
        if (this.empresa) {
            var setups = this.empresa.carteiraSetup ?? [];
            let carteiraSetup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup.id);
            if (!carteiraSetup) {
                carteiraSetup = {
                    id: 0,
                    nome: item.nome ?? '',
                    carteiraProdutoRel: [],
                    empresa_Id: this.empresa.id
                };
            } 
            item.carteiraSetup = carteiraSetup;
            setups.sort((x, y) => x.id - y.id);
            var lastId = setups.length == 0 ? 0 : setups[setups.length - 1].id;
            item.id = ++lastId;
            setups.push(item);
            this.empresa.carteiraSetup = setups;
            this.empresaService.objeto.next(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: CarteiraSetupRequest) {
        if (this.empresa) {
            var list = this.empresa.carteiraSetup ?? [];
            let index = list.findIndex(x => x.id == item.id);
            if (index != -1) {
                let carteiraSetup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup.id);
                if (!carteiraSetup) {
                    carteiraSetup = {
                        id: 0,
                        nome: item.nome ?? '',
                        carteiraProdutoRel: [],
                        empresa_Id: this.empresa.id
                    };
                }
                item.carteiraSetup = carteiraSetup;
                list.splice(index, 1, item);
                this.empresa.carteiraSetup = list;
                this.empresaService.objeto.next(this.empresa);
                this.toastr.success('Operação concluída');
                return true;
            } else {
                this.toastr.error('Usuário não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    
    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            var list = this.empresa.carteiraSetup ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.carteiraSetup = list;
                this.empresaService.objeto.next(this.empresa);
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Usuário não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }


    getList() {
        return this.http.get<CarteiraSetupRequest[]>(`${this.url}/CarteiraSetupRequest/`);
    }

    get(id: number): BehaviorSubject<undefined | CarteiraSetupRequest> {
        if (this.list.value.length == 0) {
            return new BehaviorSubject<undefined | CarteiraSetupRequest>(undefined);
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject<undefined | CarteiraSetupRequest>(undefined);
        }

        var item = this.list.value[index];
        return new BehaviorSubject<undefined | CarteiraSetupRequest>(item);
    }

    create(request: CarteiraSetupRequest) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length - 1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: CarteiraSetupRequest) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: CarteiraSetupRequest) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
