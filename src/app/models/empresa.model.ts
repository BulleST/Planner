import { CarteiraSetupRequest } from "./carteiraSetup-produto.model";
import { Cliente } from "./cliente.model";
import { Produto } from "./produto.model";
import { Usuario } from "./usuario.model";

export class Empresa {
    id: number = undefined as unknown as number;
    nome: string = '';
    email: string = '';
    cnpj: number = '' as unknown as number;
    clientes: Cliente[] = [];
    usuarios: Usuario[] = [];
    produtos: Produto[] = [];
    carteiraSetup: CarteiraSetupRequest[] = [];
}