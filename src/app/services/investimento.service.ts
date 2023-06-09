import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
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
        private router: Router,
        private http: HttpClient,
        private toastr: ToastrService,
        private accountService: AccountService,
    ) { 
        this.accountService.account.subscribe(res => {
            if (res && res?.email == 'noemi.admin@gmail.com') {
                this.url = environment.urlLocal;
            }
        });
    }

    getAll() {
        return this.http.get<Investimento[]>(`${this.url}/investimento/getAll`);
    }

    get(id: number) {
        return this.http.get<Investimento>(`${this.url}/investimento/${id}`);
    }



}
