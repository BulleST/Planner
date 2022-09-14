import { Column, FilterType, MaskType } from "../helpers/column.interface";
import { Empresa } from "./empresa.model";
import { ProdutoTributacaoRel, ProdutoTributacaoRelRequest } from "./produto-tributacao-rel.model";
import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";
import { Tributacao } from "./tributacao.model";

export class Produto {
    id: number = undefined as unknown as number;
    empresa_Id: number = undefined as unknown as number;
    empresa?: Empresa;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoAtivo?: TipoAtivo;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoRisco?: TipoRisco;
    tipoLiquidez_Id: number = undefined as unknown as number;
    tipoLiquidez?: TipoLiquidez;
    tributacao: Tributacao[] = [];
    produtoTributacaoRel: ProdutoTributacaoRel[] = [];
    taxaAdm: number =  '' as unknown as number;
    taxaPfee: number = '' as unknown as number;
    cm?: boolean;
    descricao: string = '';
}

export class ProdutoRequest {
    id: number = 0;
    empresa_Id: number = 0;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoLiquidez_Id: number = undefined as unknown as number;
    produtoTributacaoRel: ProdutoTributacaoRelRequest[] = [];
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
        decimal: '1.0-2'
     },
    { 
        field: 'taxaPfee', 
        header: 'Taxa PFEE', 
        filterType: FilterType.numeric, 
        filterDisplay: 'menu',
        mask: MaskType.percentage,
        decimal: '1.0-2'
     },
];