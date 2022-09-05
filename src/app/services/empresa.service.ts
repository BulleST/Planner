import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa, /**EmpresaEditRequest */ } from '../models/empresa.model';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);
    // objeto = new BehaviorSubject<Empresa | undefined>(undefined);
	empresaObject: BehaviorSubject<Empresa>;
	// public empresaObject: Observable<Empresa>;
	public empresa: Observable<Empresa>;


    constructor(
        private http: HttpClient,
        private crypto: Crypto,
    ) {
		this.empresaObject = new BehaviorSubject<Empresa>(new Empresa);
		// this.empresaObject = this.empresaSubject.asObservable();

		this.empresaObject = new BehaviorSubject<Empresa>(new Empresa);
		this.empresa = this.empresaObject.asObservable();
    }

    public get object()  {
        var e = localStorage.getItem('empresa')  
        if (e) {
            // this.setCreateObject(this.crypto.decrypt(e) new Empresa)
            this.setObject(JSON.parse(e) as Empresa)
        }
        return this.empresaObject.value;
    }

    setObject(value: Empresa) {
        // localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        localStorage.setItem('empresa', JSON.stringify(value))
        this.empresaObject.next(value);
        // this.empresaObject.next(value);
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
