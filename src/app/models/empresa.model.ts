import { Cliente } from "./cliente.model";
import { Produto } from "./produto.model";
import { Usuario } from "./usuario.model";

export class Empresa {
    id: number = 0;
    nome: string = '';
    email: string = '';
    cnpj: number = '' as unknown as number;
    clientes: Cliente[] = [];
    usuarios: Usuario[] = [];
    produtos: Produto[] = [];
}

export let empresas: Empresa[] = [
    { id: 1, nome: 'BulleST', cnpj: 123456000165, email: 'bullest@bullest.com.br', clientes: [], usuarios: [], produtos: [] },
    { id: 3, nome: 'Planner', cnpj: 223456000168, email: 'planner@planner.com.br', clientes: [], usuarios: [], produtos: [] },
];