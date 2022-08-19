import { Produto } from "./produto.model";
import { Tributacao } from "./tributacao.model";

export class ProdutoTributacaoRel {
    id: number = 0;
    produto: Produto = new Produto;
    produto_Id: number = undefined as unknown as number;
    tributacao: Tributacao = new Tributacao;
    tributacao_Id: number = undefined as unknown as number;
}