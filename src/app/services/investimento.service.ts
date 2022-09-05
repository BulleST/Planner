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

@Injectable({
    providedIn: 'root'
})
export class InvestimentoService {

    list_Produto = new BehaviorSubject<Produto[]>([]);
    list_Produto_Tributacao_Rel = new BehaviorSubject<ProdutoTributacaoRel[]>([]);
    list_Planejamento_Investimento = new BehaviorSubject<PlanejamentoInvestimento[]>([]);
    list_Planejamento_Produto = new BehaviorSubject<PlanejamentoProduto[]>([]);
    list_Planejamento = new BehaviorSubject<Planejamento[]>([]);
    list_Investimento = new BehaviorSubject<Investimento[]>([]);
    list_Investimento_Tributacao_Rel = new BehaviorSubject<InvestimentoTributacaoRel[]>([]);
    list_PrincipaisObjetivos = new BehaviorSubject<PrincipaisObjetivos[]>([]);
    list_FluxosPontuais = new BehaviorSubject<FluxosPontuais[]>([]);

    constructor(
        private router: Router,
        private htto: HttpClient,
        private toastr: ToastrService,
    ) { 
    }



    createInvestimento(request: PlanejamentoInvestimentoRequest) {
        var relId = 1;
        if (this.list_Investimento_Tributacao_Rel.value.length > 0) {
            relId = this.list_Investimento_Tributacao_Rel.value[this.list_Investimento_Tributacao_Rel.value.length-1].id + 1;
        }
        var rel: InvestimentoTributacaoRel = {
            id: relId,
            tributacao_Id: request.tributacao.id,
            investimento_Id: request.investimento.id
        }
        
        this.list_Investimento_Tributacao_Rel.value.push(rel);
        this.list_Investimento_Tributacao_Rel.next(this.list_Investimento_Tributacao_Rel.value)

        var planejamentoInvestimentoId = 1;
        if (this.list_Planejamento_Investimento.value.length > 0) {
            planejamentoInvestimentoId = this.list_Planejamento_Investimento.value[this.list_Planejamento_Investimento.value.length-1].id + 1;
        }
        var planejamentoInvestimento: PlanejamentoInvestimento = {
            id: planejamentoInvestimentoId,
            planejamento_Id: 1,
            investimentoTributacao_Id: 1,
            montanteAtual: request.montanteAtual,
            rentabilidade: request.rentabilidade,
            investimento: request.investimento,
            tributacao: request.tributacao,
        }
        this.list_Planejamento_Investimento.value.push(planejamentoInvestimento)
        this.list_Planejamento_Investimento.next(this.list_Planejamento_Investimento.value);
        var index = this.list_Investimento.value.map(x => x.id).indexOf(request.investimento.id);
        if (index != -1) {
            this.list_Investimento.value.splice(index, 1);
            this.list_Investimento.next(this.list_Investimento.value);
        }
        return this.list_Investimento;
    }

    deleteInvestimento(model: PlanejamentoInvestimento) {
        var index = this.list_Planejamento_Investimento.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list_Planejamento_Investimento.value.splice(index, 1);
            this.list_Planejamento_Investimento.next(this.list_Planejamento_Investimento.value);
        }
        var index = this.list_Investimento.value.findIndex(x => x.id == model.investimento.id);
        if (index == -1) {
            this.list_Investimento.value.push(model.investimento);
            this.list_Investimento.next(this.list_Investimento.value);
        }
        return this.list_Planejamento_Investimento;
    }

    createProduto(request: PlanejamentoProdutoRequest) {
        var rel: ProdutoTributacaoRel = {
            id: 1,
            produto: request.produto,
            produto_Id: request.produto.id,
            tributacao: request.tributacao,
            tributacao_Id: request.tributacao.id,
        };

        var planejamentoProduto: PlanejamentoProduto = {
            id: 1,
            planejamento_Id: 1,
            produtoTributacao_Id: 1,
            montanteAtual: request.montanteAtual,
            rentabilidade: request.rentabilidade,
            produto: request.produto,
            tributacao: request.tributacao,
        }
        
        this.list_Produto_Tributacao_Rel.value.push(rel);
        this.list_Planejamento_Produto.value.push(planejamentoProduto)
        this.list_Produto_Tributacao_Rel.next(this.list_Produto_Tributacao_Rel.value)
        this.list_Planejamento_Produto.next(this.list_Planejamento_Produto.value);


        var index = this.list_Produto.value.map(x => x.id).indexOf(request.produto.id);
        if (index != -1) {
            this.list_Produto.value.splice(index, 1);
            this.list_Produto.next(this.list_Produto.value);
        }
    }
    
    deleteProduto(model: PlanejamentoProduto) {
        var index = this.list_Planejamento_Produto.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list_Planejamento_Produto.value.splice(index, 1);
            this.list_Planejamento_Produto.next(this.list_Planejamento_Produto.value);
        }
        var index = this.list_Produto.value.findIndex(x => x.id == model.produto.id);
        if (index == -1) {
            this.list_Produto.value.push(model.produto);
            this.list_Produto.next(this.list_Produto.value);
        }
        return this.list_Planejamento_Produto;
    }

    createObjetivo(objetivo: string) {
        var id = 1;
        if (this.list_PrincipaisObjetivos.value.length > 0) {
            id = this.list_PrincipaisObjetivos.value[this.list_PrincipaisObjetivos.value.length-1].id + 1;
        }
        var obj: PrincipaisObjetivos = {
            id: id,
            descricao: objetivo
        };
        this.list_PrincipaisObjetivos.value.push(obj);
        this.list_PrincipaisObjetivos.next(this.list_PrincipaisObjetivos.value)
    }
    
    deleteObjetivo(model: PrincipaisObjetivos) {
        var index = this.list_PrincipaisObjetivos.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list_PrincipaisObjetivos.value.splice(index, 1);
            this.list_PrincipaisObjetivos.next(this.list_PrincipaisObjetivos.value);
        }
        return this.list_PrincipaisObjetivos;
    }


    createFluxoPontual(model: FluxosPontuais) {
        var id = 1;
        if (this.list_FluxosPontuais.value.length > 0) {
            id = this.list_FluxosPontuais.value[this.list_FluxosPontuais.value.length-1].id + 1;
        }
        model.id = id;
        this.list_FluxosPontuais.value.push(model);
        this.list_FluxosPontuais.next(this.list_FluxosPontuais.value)
    }
    
    deleteFluxoPontual(model: FluxosPontuais) {
        var index = this.list_FluxosPontuais.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list_FluxosPontuais.value.splice(index, 1);
            this.list_FluxosPontuais.next(this.list_FluxosPontuais.value);
        }
        return this.list_FluxosPontuais;
    }

}
