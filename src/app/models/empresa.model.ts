import { CarteiraSetupRequest } from "./carteiraSetup-produto.model";
import { Cliente } from "./cliente.model";
import { PercentualRisco } from "./percentual-risco.model";
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
    carteiraSetup: CarteiraSetupRequest[] = [];
    percentualRisco: PercentualRisco[] = [];
}


export var empresaColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
    { field: 'cnpj', header: 'CNPJ', filterType: 'text', filterDisplay: 'menu' },
    { field: 'email', header: 'E-mail', filterType: 'text', filterDisplay: 'menu' },
  ]