import { jsonIgnore } from "json-ignore";
import { Empresa } from "./empresa.model";
import { PerfilAcesso } from "./account-perfil.model";
import { FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { FilterMatchMode } from "primeng/api";

export class Usuario {
    id: number = 0;
    empresa_Id: number = 0
    perfilAcesso: PerfilAcesso = undefined as unknown as PerfilAcesso;
    perfilAcesso_Id: number = undefined as unknown as number;
    name: string = '';
    email: string = '';
    telefoneCelular: string = '';
    dataDesativado?: Date;
    ativo?: boolean;
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se  foi inserida pelo empresa/cadastrar ou empresa/editar
}

export class UsuarioRequest {
    id: number = 0;
    empresa_Id: number = 0
    perfilAcesso_Id: number = undefined as unknown as number;
    name: string = '';
    email: string = '';
    telefoneCelular: string = '';
    dataDesativado?: Date;
    ativo?: boolean;
    
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; 

}


export var userColumns = [
    {
        field: 'id',
        header: 'Id',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
    },
    {
        field: 'name',
        header: 'Nome',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
        // maskType: MaskType.substring,
        // substringLength: 22,
    },
    {
        field: 'email',
        header: 'E-mail',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 30,
    },
    {
        field: 'telefoneCelular',
        header: 'Telefone/Celular',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.telefoneCelular,
    },
    {
        field: 'perfilAcesso.perfil',
        header: 'Tipo de Acesso',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
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
];
