import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
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
        maskType: MaskType.undefined,
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
        field: 'taxaAdm', 
        header: 'Taxa ADM', 
        maskType: MaskType.percentage,
        decimal: '1.0-2',
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
     },
    { 
        field: 'taxaPfee', 
        header: 'Taxa PFEE', 
        maskType: MaskType.percentage,
        decimal: '1.0-2',
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
     },
];