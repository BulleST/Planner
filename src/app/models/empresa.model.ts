import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { CarteiraSetup, CarteiraSetupRequest } from "./carteiraSetup.model";
import { Cliente, ClienteRequest } from "./cliente.model";
import { PercentualRisco, PercentualRiscoRequest } from "./percentual-risco.model";
import { Produto, ProdutoRequest } from "./produto.model";
import { Usuario, UsuarioRequest } from "./usuario.model";

export class Empresa {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    cliente: Cliente[] = [];
    account: Usuario[] = [];
    produto: Produto[] = [];
    carteiraSetup: CarteiraSetup[] = [];
    percentualRisco: PercentualRisco[] = [];
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
}

export var empresaColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined
    },
    { 
        field: 'nome', 
        header: 'Razão Social', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined
    },
    { 
        field: 'cnpj', 
        header: 'CNPJ', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.cnpj
    },
    { 
        field: 'email', 
        header: 'E-mail', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined
    },
  ]