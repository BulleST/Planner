import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { CarteiraSetup } from "./carteiraSetup.model";
import { Cliente } from "./cliente.model";
import { PercentualRisco } from "./percentual-risco.model";
import { Produto } from "./produto.model";
import { Usuario } from "./usuario.model";

export class Empresa {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    cliente: Cliente[] = [];
    usuario: Usuario[] = [];
    produto: Produto[] = [];
    carteiraSetup: CarteiraSetup[] = [];
    percentualRisco: PercentualRisco[] = [];
}



export class EmpresaEditRequest {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
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