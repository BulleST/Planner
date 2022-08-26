import { CarteiraSetup } from "./carteiraSetup.model";
import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";

export class CarteiraProdutoRel {
    id: number = 0;
    carteiraSetup_Id: number = 0;
    carteiraSetup?: CarteiraSetup;
    produtoTributacao_Id: number = 0;
    percentual: number = 0;
    produtoTributacaoRel: ProdutoTributacaoRel = new ProdutoTributacaoRel;
}

export class CarteiraSetupRelRequest {
    id: number = 0;
    carteiraSetup: CarteiraSetup = undefined as unknown as CarteiraSetup;
    carteiraSetup_Id: number = undefined as unknown as number;
    nome: string = '';
    percentual: number = '' as unknown as number;
    produtoTributacaoRel: ProdutoTributacaoRel[] = [];
}

export var setupColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'carteiraSetup.nome', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
    { field: 'percentual', header: 'Percentual', filterType: 'numeric', filterDisplay: 'menu' },
];