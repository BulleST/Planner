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
        this.empresaService.empresaObject.subscribe(res => {
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
                this.toastr.error('Selecione um perfil de investidor válido!!');
                return false;
            }
            item.perfilInvestidor = perfilInvestidor;

            let existe = this.empresa.percentualRisco.find(x => x.perfilInvestidor_Id == item.perfilInvestidor_Id 
                && x.baixissimo == item.baixissimo
                && x.baixo == item.baixo
                && x.moderado == item.moderado
                && x.arrojado == item.arrojado
                && x.superArrojado == item.superArrojado
                && x.hedge == item.hedge
                && x.empresa_Id == item.empresa_Id);
            
            if (existe) {
                this.toastr.error('Um outro percentual de risco nessa empresa já está cadastrado com os mesmos dados!!');
                return false;
            }

            list.sort((x, y) => x.id - y.id)
            var lastId = list.length == 0 ? 0 : list[list.length - 1].id;
            item.id = ++lastId;
            item.registroNaoSalvo = true;
            
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

                let existe = this.empresa.percentualRisco.find(x => x.perfilInvestidor_Id == item.perfilInvestidor_Id 
                    && x.baixissimo == item.baixissimo
                    && x.baixo == item.baixo
                    && x.moderado == item.moderado
                    && x.arrojado == item.arrojado
                    && x.superArrojado == item.superArrojado
                    && x.hedge == item.hedge
                    && x.empresa_Id == item.empresa_Id
                    && x.id != item.id);
                
                if (existe) {
                    this.toastr.error('Um outro percentual de risco nessa empresa já está cadastrado com os mesmos dados!!');
                    return false;
                }

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

    getList(empresa_Id: number = 1) {
        return this.http.get<PercentualRisco[]>(`${this.url}/percentual-risco/all/${empresa_Id}`);
    }

    get(id: number) {
        return this.http.get<PercentualRisco>(`${this.url}/percentual-risco/${id}`);
    }

    create(request: PercentualRisco) {
        return this.http.post<PercentualRisco>(`${this.url}/percentual-risco/`, request);
    }

    edit(request: PercentualRisco) {
        return this.http.put<PercentualRisco>(`${this.url}/percentual-risco/`, request);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.url}/percentual-risco/${id}`);
    }

}
