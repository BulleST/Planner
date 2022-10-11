import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";
import { Produto } from "./produto.model";
import { Tributacao } from "./tributacao.model";

export class PlanejamentoProduto {
    id: number = 0;
    planejamento_Id: number = 0;
    produtoTributacaoRel_Id: number = undefined as unknown as number ;
    produtoTributacaoRel?: ProdutoTributacaoRel;
    rentabilidade: number = '' as unknown as number;
    rentabilidadeLiquida: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    sugerido: number = '' as unknown as number;
    planoAcao: number = '' as unknown as number;

    // produto: Produto = new Produto;
    // tributacao: Tributacao = new Tributacao;
}

export class PlanejamentoProdutoRequest {
    rentabilidade: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    produto: Produto = new Produto;
    tributacao: Tributacao = new Tributacao;
}