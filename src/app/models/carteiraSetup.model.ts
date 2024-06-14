import { jsonIgnore } from "json-ignore";
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { CarteiraProdutoRel, CarteiraProdutoRelRequest } from "./carteira-produto-rel";
import { CarteiraRiscoRel } from "./carteira-risco-rel.model";
import { ListActions } from "./actions.model";

export class CarteiraSetup extends ListActions {
    id: number = 0;
    nome: string = '';
    empresa_Id: number = 0;
    dataDesativado?: Date;
    carteiraProdutoRel: CarteiraProdutoRel[] = [];
    carteiraRiscoRel: CarteiraRiscoRel[] = [];
    @jsonIgnore()
    ativo?: boolean;
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se foi inserida pelo empresa/cadastrar ou empresa/editar
}

export class CarteiraSetupRequest {
    id: number = 0;
    nome: string = '';
    empresa_Id: number = 0;
    @jsonIgnore()
    ativo?: boolean;
    dataDesativado?: Date;
    carteiraProdutoRel: CarteiraProdutoRelRequest[] = [];
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se  foi inserida pelo empresa/cadastrar ou empresa/editar
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
        // maskType: MaskType.substring,
        // substringLength: 22,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowMatchMode: true,
    },
    {
        field: 'ativo',
        header: 'Ativo',
        maskType: MaskType.boolean,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
        booleanValues: {
            'true': 'ativo',
            'false': 'inativo',
        }
    },
];