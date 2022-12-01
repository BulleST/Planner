import { jsonIgnore } from "json-ignore";
import { Empresa } from "./empresa.model";
import { PerfilAcesso } from "./usuario-perfil.model";

export class Usuario {
    id: number = 0;
    empresa_Id: number = 0
    perfilAcesso: PerfilAcesso = new PerfilAcesso;
    perfilAcesso_Id: number = undefined as unknown as number;
    name: string = '';
    email: string = '';
    telefoneCelular: string = '';
    
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se  foi inserida pelo empresa/cadastrar ou empresa/editar
}


export var userColumns = [
    {
        field: 'id',
        header: 'Id',
        filterType: 'text',
        filterDisplay: 'menu'
    },
    {
        field: 'name',
        header: 'Nome',
        filterType: 'text',
        filterDisplay: 'menu'
    },
    {
        field: 'email',
        header: 'E-mail',
        filterType: 'text',
        filterDisplay: 'menu'
    },
    {
        field: 'perfilAcesso.perfil',
        header: 'Tipo de Acesso',
        filterType: 'text',
        filterDisplay: 'menu'
    },
];
