import { CarteiraSetup } from "./carteiraSetup.model";
import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";
import { Column, FilterDisplay, FilterType, MaskType } from './../helpers/column.interface';

export class CarteiraProdutoRel {
    id: number = 0;
    carteiraSetup_Id: number = 0;
    // carteiraSetup?: CarteiraSetup;
    percentual: number = 0;
    produtoTributacao_Id: number = 0;
    produtoTributacaoRel: ProdutoTributacaoRel = new ProdutoTributacaoRel;
}

export class CarteiraSetupRelRequest {
    id: number = 0;
    empresa_Id: number = 0;
    carteiraSetup: string = '';
    carteiraSetup_Id: number = undefined as unknown as number;
    percentual: number = '' as unknown as number;
    produtoTributacaoRel: ProdutoTributacaoRel[] = [];
}

export class CarteiraProdutoList {
    id: number = 0; // CateiraProduto_Id
    carteiraSetup: string = '';
    carteiraSetup_Id: number = undefined as unknown as number;
    percentual: number = '' as unknown as number;
    produto: string = '';
    produto_Id: number = undefined as unknown as number;
    tributacao: string = '';
    tributacao_Id: number = undefined as unknown as number;
    aliquota?: number;
}

export var setupColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined,
    },
    { 
        field: 'carteiraSetup', 
        header: 'Carteira', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined,
    },
    { 
        field: 'percentual', 
        header: 'Percentual', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage,
        decimal: '1.2'
    },
    { 
        field: 'produto', 
        header: 'Produto', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined,
    },
    { 
        field: 'tributacao', 
        header: 'Tributacao', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined,
    },
    { 
        field: 'aliquota', 
        header: 'Alíquota', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage,
        decimal: '1.2'
    },
];