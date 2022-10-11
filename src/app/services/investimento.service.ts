import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlanejamentoInvestimento, PlanejamentoInvestimentoRequest } from '../models/planejamento-investimento.model';
import { ToastrService } from 'ngx-toastr';
import { Planejamento } from '../models/planejamento.model';
import { InvestimentoTributacaoRel } from '../models/investimento-tributacao-rel.model';
import { BehaviorSubject } from 'rxjs';
import { Investimento } from '../models/investimento.model';
import { Produto } from '../models/produto.model';
import { PlanejamentoProduto, PlanejamentoProdutoRequest } from '../models/planejamento-produto.model';
import { ProdutoTributacaoRel } from '../models/produto-tributacao-rel.model';
import { PrincipaisObjetivos } from '../models/objetivos.model';
import { FluxosPontuais } from '../models/fluxosPontuais.model';
import { environment } from 'src/environments/environment';

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
    ) { 
    }

    getAll() {
        return this.http.get<Investimento[]>(`${this.url}/investimento/getAll`);
    }

    get(id: number) {
        return this.http.get<Investimento>(`${this.url}/investimento/${id}`);
    }



}
