import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { Produto } from '../models/produto.model';
import { CarteiraSetupRelRequest } from '../models/carteiraSetup-produto.model';
import { environment } from 'src/environments/environment';
import { PercentualRisco } from '../models/percentual-risco.model';
import { DropdownService } from './dropdown.service';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);
    // objeto = new BehaviorSubject<Empresa | undefined>(undefined);
	private empresaSubject: BehaviorSubject<Empresa | undefined>;
	public empresa: Observable<Empresa | undefined>;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
    ) {
		this.empresaSubject = new BehaviorSubject<Empresa | undefined>(undefined);
		this.empresa = this.empresaSubject.asObservable();
    }

    public get objeto(): Empresa | undefined  {
        var e = localStorage.getItem('empresa')  
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new Empresa)
        }
        return this.empresaSubject.value;
    }

    setObject(value: Empresa | undefined) {
        localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        this.empresaSubject.next(value);
    }

    getList() {
        return this.http.get<Empresa[]>(`${this.url}/Empresa/`);
    }

    get(id: number): BehaviorSubject<undefined | Empresa> {
        if (this.list.value.length == 0) {
            return new BehaviorSubject<undefined | Empresa>(undefined);
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject<undefined | Empresa>(undefined);
        }

        var item = this.list.value[index];
        return new BehaviorSubject<undefined | Empresa>(item);
    }

    create(request: Empresa) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length - 1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: Empresa) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: Empresa) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
