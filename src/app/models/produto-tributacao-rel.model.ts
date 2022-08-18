import { Produto } from "./produto.model";
import { Tributacao } from "./tributacao.model";

export class ProdutoTributacaoRel {
    id: number = 0;
    produto: Produto = new Produto;
    tributacao: Tributacao = new Tributacao;
}