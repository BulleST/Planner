import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { CarteiraSetup, CarteiraSetupRequest } from "./carteiraSetup.model";
import { Cliente, ClienteRequest } from "./cliente.model";
import { PercentualRisco, PercentualRiscoRequest } from "./percentual-risco.model";
import { Produto, ProdutoRequest } from "./produto.model";
import { Usuario, UsuarioRequest } from "./usuario.model";
import { ListActions } from "./actions.model";

export class Empresa extends ListActions {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    cliente: Cliente[] = [];
    account: Usuario[] = [];
    produto: Produto[] = [];
    carteiraSetup: CarteiraSetup[] = [];
    percentualRisco: PercentualRisco[] = [];
    dataDesativado?: Date;
    ativo?: boolean;
}

export class EmpresaRequest {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    cliente: ClienteRequest[] = [];
    account: UsuarioRequest[] = [];
    produto: ProdutoRequest[] = [];
    carteiraSetup: CarteiraSetupRequest[] = [];
    percentualRisco: PercentualRiscoRequest[] = [];
    dataDesativado?: Date;
    ativo?: boolean;
}

export var empresaColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
        filterShowAddButton: false,
        filterShowMatchMode: false,
    },
    { 
        field: 'nome', 
        header: 'Razão Social', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 22,
        filterShowAddButton: false,
        filterShowMatchMode: false,
    },
    { 
        field: 'cnpj', 
        header: 'CNPJ', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.cnpj,
        filterShowAddButton: false,
        filterShowMatchMode: false,
    },
    { 
        field: 'email', 
        header: 'E-mail', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
        filterShowAddButton: false,
        filterShowMatchMode: false,
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
  ]