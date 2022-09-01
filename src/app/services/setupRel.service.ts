import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarteiraProdutoRel } from '../models/carteiraSetup-produto.model';

@Injectable({
    providedIn: 'root'
})
export class CarteiraProdutoService {
    url = environment.url;

    constructor(
        private http: HttpClient,
    ) {
    }
    get(id: number){
        return this.http.get<CarteiraProdutoRel>(`${this.url}/carteiraProdutoRel/${id}`);
    }


}
