import { jsonIgnore } from "json-ignore";
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Empresa } from "./empresa.model";
import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";
import { ListActions } from "./actions.model";

export class Produto extends ListActions {
    id: number = undefined as unknown as number;
    descricao: string = '';
    empresa_Id: number = undefined as unknown as number;
    empresa?: Empresa;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoAtivo: TipoAtivo = new TipoAtivo;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoRisco: TipoRisco = new TipoRisco;
    tipoLiquidez_Id: number = undefined as unknown as number;
    tipoLiquidez: TipoLiquidez = new TipoLiquidez;
    dataDesativado?: Date;
    ativo?: boolean;

    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se  foi inserida pelo empresa/cadastrar ou empresa/editar
    
}

export class ProdutoRequest {
    id: number = 0;
    descricao: string = '';
    empresa_Id: number = 0;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoLiquidez_Id: number = undefined as unknown as number;
    tipoRisco_Id: number = undefined as unknown as number;
    dataDesativado?: Date;

}


export var produtoColumns: Column[] = [
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
        field: 'descricao',
        header: 'Nome',
        maskType: MaskType.substring,
        substringLength: 22,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'tipoAtivo.nome',
        header: 'Ativo',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'tipoRisco.nome',
        header: 'Risco',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'tipoLiquidez.nome',
        header: 'Liquidez',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
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