import { CarteiraSetup } from "./carteiraSetup.model";
import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";
import { Produto } from "./produto.model";
import { Tributacao } from "./tributacao.model";

export class CarteiraProduto_Rel {
    id: number = 0;
    carteiraSetup_Id: number = 0;
    produtoTributacao_Id: number = 0;
    percentual: number = 0;
    produtoTributacaoRel: ProdutoTributacaoRel = new ProdutoTributacaoRel;
}

export class CarteiraSetupRequest {
    id: number = 0;
    carteiraSetup: CarteiraSetup = undefined as unknown as CarteiraSetup;
    carteiraSetup_Id: number = undefined as unknown as number;
    nome?: string = '';
    percentual: number = '' as unknown as number;
    produtoTributacaoRel: ProdutoTributacaoRel[] = [];
}

export var setupColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'carteiraSetup.nome', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
    // { field: 'produto.descricao', header: 'Produto', filterType: 'text', filterDisplay: 'menu' },
    // { field: 'tributacao.descricao', header: 'Tributacao', filterType: 'text', filterDisplay: 'menu' },
    // { field: 'tributacao.aliquota', header: 'Alíquota', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'percentual', header: 'Percentual', filterType: 'numeric', filterDisplay: 'menu' },
];