import { CarteiraProdutoRel, CarteiraProdutoRequest, CarteiraSetupRelRequest } from "./carteiraSetup-produto.model";
import { CarteiraSetup } from "./carteiraSetup.model";
import { Cliente } from "./cliente.model";
import { PercentualRisco } from "./percentual-risco.model";
import { PerfilInvestidor } from "./perfilInvestidor.model";
import { Produto } from "./produto.model";
import { Usuario } from "./usuario.model";

export class Empresa {
    id: number = undefined as unknown as number;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    cliente: Cliente[] = [];
    usuario: Usuario[] = [];
    produto: Produto[] = [];
    carteiraSetup: CarteiraSetup[] = []; // Referente ao REL
    percentualRisco: PercentualRisco[] = [];
}


export class EmpresaCreateRequest {
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
    usuario: Usuario[] = [];
    produto: Produto[] = [];
    carteiraSetup: CarteiraProdutoRequest[] = [];
    percentualRisco: PercentualRisco[] = [];
}


export class EmpresaEditRequest {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    email: string = '';
}




export var empresaColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
    { field: 'cnpj', header: 'CNPJ', filterType: 'text', filterDisplay: 'menu' },
    { field: 'email', header: 'E-mail', filterType: 'text', filterDisplay: 'menu' },
  ]