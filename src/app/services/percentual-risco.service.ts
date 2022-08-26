import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Empresa } from "../models/empresa.model";
import { PercentualRisco } from "../models/percentual-risco.model";
import { Crypto } from "../utils/crypto";
import { Table } from "../utils/table";
import { DropdownService } from "./dropdown.service";
import { EmpresaService } from "./empresa.service";

@Injectable({
    providedIn: 'root'
})
export class PercentualRiscoService {
    url = environment.url;
    list = new BehaviorSubject<PercentualRisco[]>([]);
    objeto = new BehaviorSubject<PercentualRisco | undefined>(undefined);
    empresa?= new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.empresa = res;
        });
    }

    getObject() {
        var e = localStorage.getItem('percentualRisco')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new PercentualRisco)
        }
        return this.objeto;
    }

    setObject(value: PercentualRisco) {
        localStorage.setItem('percentualRisco', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
    }

    add_To_Empresa_List(item: PercentualRisco) {
        if (this.empresa) {
            var list = this.empresa.percentualRisco ?? [];
            let perfilInvestidor = this.dropdownService.perfilInvestidor.value.find(x => x.id == item.perfilInvestidor_Id);
            if (!perfilInvestidor) {
                this.toastr.error('Selecione um tipo de perfil de acesso válido!!');
                return false;
            }
            item.perfilInvestidor = perfilInvestidor;
            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            list.push(item);
            this.empresa.percentualRisco = list;
            this.empresaService.setObject(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;

        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: PercentualRisco) {
        if (this.empresa) {
            var list = this.empresa.percentualRisco ?? [];
            let index = list.findIndex(x => x.id == item.id);
            if (index != -1) {
                let perfilInvestidor = this.dropdownService.perfilInvestidor.value.find(x => x.id == item.perfilInvestidor_Id);
                if (!perfilInvestidor) {
                    this.toastr.error('Selecione um tipo de perfil de acesso válido!!');
                    return false;
                }
                item.perfilInvestidor = perfilInvestidor;
                list.splice(index, 1, item);
                this.empresa.percentualRisco = list;
                this.empresaService.setObject(this.empresa);
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
            var list = this.empresa.percentualRisco ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.percentualRisco = list;
                this.empresaService.setObject(this.empresa);
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
        return this.http.get<PercentualRisco[]>(`${this.url}/PercentualRisco/`);
    }

    get(id: number): BehaviorSubject<undefined | PercentualRisco> {
        if (this.list.value.length == 0) {
            return new BehaviorSubject<undefined | PercentualRisco>(undefined);
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject<undefined | PercentualRisco>(undefined);
        }

        var item = this.list.value[index];
        return new BehaviorSubject<undefined | PercentualRisco>(item);
    }

    create(request: PercentualRisco) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length - 1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: PercentualRisco) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: PercentualRisco) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
