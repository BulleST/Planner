import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";
import { Tributacao } from "./tributacao.model";

export class Produto {
    id: number = undefined as unknown as number;
    empresa_Id: number = undefined as unknown as number;
    tipoAtivo: TipoAtivo = undefined as unknown as TipoAtivo;
    tipoRisco: TipoRisco = undefined as unknown as TipoRisco;
    tipoLiquidez: TipoLiquidez = undefined as unknown as TipoLiquidez;
    tributacao: Tributacao[] = [];
    taxaAdm: number =  '' as unknown as number;
    taxaPfee: number = '' as unknown as number;
    cm?: boolean;
    descricao: string = '';
}

export var produtoColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'descricao', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoAtivo.nome', header: 'Ativo', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoRisco.nome', header: 'Risco', filterType: 'text', filterDisplay: 'menu' },
    { field: 'tipoLiquidez.nome', header: 'Liquidez', filterType: 'text', filterDisplay: 'menu' },
    { field: 'taxaAdm', header: 'Taxa ADM', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'taxaPfee', header: 'Taxa PFEE', filterType: 'numeric', filterDisplay: 'menu' },
    // { field: 'cm', header: 'CM', filterType: 'text', filterDisplay: 'menu' },
];