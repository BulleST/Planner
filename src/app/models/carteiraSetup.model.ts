import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { CarteiraProdutoRel } from "./carteira-produto-rel";
import { CarteiraRiscoRel } from "./carteira-risco-rel.model";

export class CarteiraSetup {
    id: number = 0;
    nome: string = '';
    empresa_Id: number = 0;
    percentualTotal?: number;
    carteiraProdutoRel: CarteiraProdutoRel[] = [];
    carteiraRiscoRel: CarteiraRiscoRel[] = [];
}

export var setupColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowMatchMode: true,
    },
    { 
        field: 'nome', 
        header: 'Carteira', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowMatchMode: true,
    },
];