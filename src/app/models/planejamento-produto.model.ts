// import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";
import { Produto } from "./produto.model";
// import { Tributacao } from "./tributacao.model";

export class PlanejamentoProduto {
    id: number = 0;
    planejamento_Id: number = 0;
    rentabilidade: number = '' as unknown as number;
    rentabilidadeLiquida: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    sugerido: number = '' as unknown as number;
    planoAcao: number = '' as unknown as number;
    percentual: number = '' as unknown as number;
    custosTaxas: number = '' as unknown as number;
    produto: Produto = new Produto;
    produto_Id: number = undefined as unknown as number;

}
