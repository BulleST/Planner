import { Tributacao } from "./tributacao.model";

export class Produto {
    id: number = 0;
    empresa_Id: number = 0;
    tipoAtivo_Id: number = undefined as unknown as number;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoLiquidez_Id: number = undefined as unknown as number;
    tributacao_Id: number = undefined as unknown as number;
    tributacao: Tributacao[] = [];
    taxaAdm: number =  '' as unknown as number;
    taxaPfee: number = '' as unknown as number;
    cm?: boolean;
    descricao: string = '';
}

export var produtoColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'descricao', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoAtivo', header: 'Ativo', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoRisco', header: 'Risco', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoLiquidez', header: 'Liquidez', filterType: 'text', filterDisplay: 'menu' },
    { field: 'taxaAdm', header: 'Taxa ADM', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'taxaPfee', header: 'Taxa PFEE', filterType: 'numeric', filterDisplay: 'menu' },
    // { field: 'cm', header: 'CM', filterType: 'text', filterDisplay: 'menu' },
];