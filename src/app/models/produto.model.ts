import { Column, FilterType, MaskType } from "../helpers/column.interface";
import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";
import { Tributacao } from "./tributacao.model";

export class Produto {
    id: number = undefined as unknown as number;
    empresa_Id: number = undefined as unknown as number;
    tipoAtivo: TipoAtivo = undefined as unknown as TipoAtivo;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoRisco: TipoRisco = undefined as unknown as TipoRisco;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoLiquidez: TipoLiquidez = undefined as unknown as TipoLiquidez;
    tipoLiquidez_Id: number = undefined as unknown as number;
    tributacao: Tributacao[] = [];
    taxaAdm: number =  '' as unknown as number;
    taxaPfee: number = '' as unknown as number;
    cm?: boolean;
    descricao: string = '';
}


export var produtoColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: 'menu',
        mask: MaskType.undefined
     },
    { 
        field: 'descricao', 
        header: 'Nome', 
        filterType: FilterType.text, 
        filterDisplay: 'menu',
        mask: MaskType.undefined
     },
    { 
        field: 'tipoAtivo.nome', 
        header: 'Ativo', 
        filterType: FilterType.text, 
        filterDisplay: 'menu',
        mask: MaskType.undefined
     },
    { 
        field: 'tipoRisco.nome', 
        header: 'Risco', 
        filterType: FilterType.text, 
        filterDisplay: 'menu',
        mask: MaskType.undefined
     },
    { 
        field: 'tipoLiquidez.nome', 
        header: 'Liquidez', 
        filterType: FilterType.text, 
        filterDisplay: 'menu',
        mask: MaskType.undefined
     },
    { 
        field: 'taxaAdm', 
        header: 'Taxa ADM', 
        filterType: FilterType.numeric, 
        filterDisplay: 'menu',
        mask: MaskType.percentage,
        decimal: '1.2'
     },
    { 
        field: 'taxaPfee', 
        header: 'Taxa PFEE', 
        filterType: FilterType.numeric, 
        filterDisplay: 'menu',
        mask: MaskType.percentage,
        decimal: '1.2'
     },
];