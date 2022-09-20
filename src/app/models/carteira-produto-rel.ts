import { CarteiraSetup } from "./carteiraSetup.model";
import { ProdutoTributacaoRel } from "./produto-tributacao-rel.model";
import { Column, FilterDisplay, FilterType, MaskType } from '../helpers/column.interface';
import { CarteiraRiscoRel } from "./carteira-risco-rel.model";
import { FilterMatchMode } from "primeng/api";

export class CarteiraProdutoRel {
    id: number = 0;
    carteiraSetup_Id: number = 0;
    carteiraSetup?: CarteiraSetup;
    percentual: number = 0;
    produtoTributacao_Id: number = 0;
    produtoTributacaoRel: ProdutoTributacaoRel = new ProdutoTributacaoRel;
}

export class CarteiraRequest {
    id: number = 0;
    empresa_Id: number = 0;
    nome: string = '';
    // produtoTributacaoRel: ProdutoTributacaoRel[] = [];
    carteiraProdutoRel: CarteiraProdutoRel[] = [];
    carteiraRiscoRel: CarteiraRiscoRel[] = [];
}

export var setupRelColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    { 
        field: 'carteiraSetup.nome', 
        header: 'Carteira', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    { 
        field: 'percentual', 
        header: 'Percentual', 
        maskType: MaskType.percentage,
        decimal: '1.2',
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    { 
        field: 'produtoTributacaoRel.produto.descricao', 
        header: 'Produto', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    { 
        field: 'produtoTributacaoRel.tributacao.descricao', 
        header: 'Tributacao', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    { 
        field: 'produtoTributacaoRel.tributacao.aliquota', 
        header: 'Alíquota',
        maskType: MaskType.percentage,
        decimal: '1.2',
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
];