import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Investimento } from '../models/investimento.model';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class InvestimentoService {
    url = environment.url;
    list = new BehaviorSubject<Investimento[]>([]);

    constructor(
        private http: HttpClient,
    ) { }

    getAll() {
        return this.http.get<Investimento[]>(`${this.url}/investimento/getAll`)    
        .pipe(map(list => {;
            this.list.next(list);
            return list;
        })
    );;
    }

    get(id: number) {
        return this.http.get<Investimento>(`${this.url}/investimento/${id}`);
    }



}
