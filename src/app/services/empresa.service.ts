import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa, /**EmpresaEditRequest */ } from '../models/empresa.model';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);
	empresaObject: BehaviorSubject<Empresa>;
	empresaSelected: BehaviorSubject<Empresa | undefined> = new BehaviorSubject<Empresa | undefined>(undefined);
	public empresa: Observable<Empresa>;

    constructor(
        private http: HttpClient,
        private crypto: Crypto,
        private accountService: AccountService
    ) {
		this.empresaObject = new BehaviorSubject<Empresa>(new Empresa);
		this.empresa = this.empresaObject.asObservable();
        this.accountService.account.subscribe(res => {
            if (res && res.role == 'Admin') {

            } else {
                this.empresaSelected.next(undefined)
            }
        })
    }

    public get object()  {
        var e = localStorage.getItem('empresa') as string;
        if (e && e.trim()) {
            this.setObject(this.crypto.decrypt(e) as Empresa)
            // this.setObject(JSON.parse(e) as Empresa)
        }
        return this.empresaObject.value;
    }

    setObject(value: Empresa) {
        localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        this.empresaObject.next(value);
    }

    getList() {
        return this.http.get<Empresa[]>(`${this.url}/empresa/`);
    }

    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`);
    }

    create(request: Empresa) {
        return this.http.post(`${this.url}/empresa/`, request);
    }

    edit(request: Empresa) {
        return this.http.put(`${this.url}/empresa/`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/empresa/${id}`);
    }

}
