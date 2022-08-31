import { MaskType } from "../helpers/column.interface";
import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";
import { Tributacao } from "./tributacao.model";

export class Produto {
    id: number = undefined as unknown as number;
    empresa_Id: number = undefined as unknown as number;
    tipoAtivo: TipoAtivo = undefined as unknown as TipoAtivo;
    tipoAtivo_Id: number = undefined as unknown as number;
    // tipoAtivo: string = '';
    tipoRisco: TipoRisco = undefined as unknown as TipoRisco;
    tipoRisco_Id: number = undefined as unknown as number;
    // tipoRisco: string = '';
    tipoLiquidez: TipoLiquidez = undefined as unknown as TipoLiquidez;
    tipoLiquidez_Id: number = undefined as unknown as number;
    // tipoLiquidez: string = '';
    tributacao: Tributacao[] = [];
    taxaAdm: number =  '' as unknown as number;
    taxaPfee: number = '' as unknown as number;
    cm?: boolean;
    descricao: string = '';
}


export var produtoColumns = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },
    { 
        field: 'descricao', 
        header: 'Nome', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },
    { 
        field: 'tipoAtivo.nome', 
        header: 'Ativo', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },
    { 
        field: 'tipoRisco.nome', 
        header: 'Risco', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },
    { 
        field: 'tipoLiquidez.nome', 
        header: 'Liquidez', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },
    { 
        field: 'taxaAdm', 
        header: 'Taxa ADM', 
        filterType: 'numeric', 
        filterDisplay: 'menu',
        mask: MaskType.percentage,
        decimal: '1.2'
     },
    { 
        field: 'taxaPfee', 
        header: 'Taxa PFEE', 
        filterType: 'numeric', 
        filterDisplay: 'menu',
        mask: MaskType.percentage,
        decimal: '1.2'
     },
    /*{ 
        field: 'cm', 
        header: 'CM', 
        filterType: 'text', 
        filterDisplay: 'menu',
     },*/
];