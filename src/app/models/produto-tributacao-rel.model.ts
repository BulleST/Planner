import { Produto } from "./produto.model";
import { Tributacao } from "./tributacao.model";

export class ProdutoTributacaoRel {
    id: number = 0;
    produto: string = '';
    produto_Id: number = undefined as unknown as number;
    tributacao: string = '';
    tributacao_Id: number = undefined as unknown as number;
    aliquota?: number;
}