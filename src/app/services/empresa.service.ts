import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa, EmpresaCreateRequest, EmpresaEditRequest } from '../models/empresa.model';
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
	private createEmpresaSubject: BehaviorSubject<EmpresaCreateRequest | undefined>;
	public createEmpresaObject: Observable<EmpresaCreateRequest | undefined>;
	private empresaSubject: BehaviorSubject<Empresa | undefined>;
	public empresa: Observable<Empresa | undefined>;


    constructor(
        private http: HttpClient,
        private crypto: Crypto,
    ) {
		this.createEmpresaSubject = new BehaviorSubject<EmpresaCreateRequest | undefined>(undefined);
		this.createEmpresaObject = this.createEmpresaSubject.asObservable();

		this.empresaSubject = new BehaviorSubject<Empresa | undefined>(undefined);
		this.empresa = this.empresaSubject.asObservable();
    }

    public get createObjeto(): EmpresaCreateRequest | undefined  {
        var e = localStorage.getItem('empresaCreateRequest')  
        if (e) {
            // this.setCreateObject(this.crypto.decrypt(e) ?? new Empresa)
            this.setCreateObject(JSON.parse(e) as EmpresaCreateRequest ?? new EmpresaCreateRequest)
        }
        return this.createEmpresaSubject.value;
    }

    setCreateObject(value: EmpresaCreateRequest | undefined) {
        // localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        localStorage.setItem('empresaCreateRequest', JSON.stringify(value))
        this.createEmpresaSubject.next(value);
    }

    getList() {
        return this.http.get<Empresa[]>(`${this.url}/empresa/`);
    }

    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`);
    }

    create(request: EmpresaCreateRequest) {
        return this.http.post(`${this.url}/empresa/`, request);
    }

    edit(request: EmpresaEditRequest) {
        return this.http.put(`${this.url}/empresa/`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/empresa/${id}`);
    }

}
