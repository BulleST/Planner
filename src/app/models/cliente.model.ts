import { jsonIgnore } from "json-ignore";
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Empresa } from "./empresa.model";
import { EstadoCivil } from "./estadoCivil.model";
import { PerfilInvestidor } from "./perfilInvestidor.model";
import { ListActions } from "./actions.model";

export class Cliente extends ListActions {
    id: number = 0;
    empresa?: Empresa = new Empresa;
    empresa_Id: number = undefined as unknown as number;
    account_Id?: number;
    perfilInvestidor?: PerfilInvestidor;
    perfilInvestidor_Id: number = undefined as unknown as number;
    nome: string = '';
    idade: number = '' as unknown as number;
    altura: number = '' as unknown as number;
    peso: number = '' as unknown as number;
    imc: number = '' as unknown as number;
    estadoCivil?: EstadoCivil;
    estadoCivil_Id: number = undefined as unknown as number;
    dataNascimento: Date = '' as unknown as Date;
    cpf: number = '' as unknown as number;
    rg: number = '' as unknown as number;
    email: string = '';
    receita: number = '' as unknown as number;
    despesa: number = '' as unknown as number;

    idadeAposentadoria: number = '' as unknown as number;
    rendaMensalAposentadoria: number = '' as unknown as number;
    rentabilidadeAposentadoria: number = '' as unknown as number;
    
    dataDesativado?: Date;
    ativo?: boolean;

    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se foi inserida pelo empresa/cadastrar ou empresa/editar
}

export class ClienteList extends ListActions {
    id: number = 0;
    nome: string = '';
    perfilInvestidor: string = '';
    accountEmail: string = '';
    cpf: number = '' as unknown as number;
    dataDesativado?: Date;
    ativo?: boolean;
    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se foi inserida pelo empresa/cadastrar ou empresa/editar
}


export class ClienteRequest {
    id: number = 0;
    empresa: Empresa = new Empresa;
    empresa_Id: number = undefined as unknown as number;
    perfilInvestidor_Id: number = undefined as unknown as number;
    nome: string = '';
    idade: number = '' as unknown as number;
    altura: number = '' as unknown as number;
    peso: number = '' as unknown as number;
    imc: number = '' as unknown as number;
    estadoCivil_Id: number = undefined as unknown as number;
    dataNascimento: Date = '' as unknown as Date;
    cpf: number = '' as unknown as number;
    rg: number = '' as unknown as number;
    email: string = '';
    receita: number = '' as unknown as number;
    despesa: number = '' as unknown as number;
    idadeAposentadoria: number = '' as unknown as number;
    rendaMensalAposentadoria: number = '' as unknown as number;
    rentabilidadeAposentadoria: number = '' as unknown as number;
}


export var clienteColumns: Column[] = [
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
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.substring,
        substringLength: 22,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cpf',
        header: 'CPF',
        maskType: MaskType.cpf,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        // field: 'perfilInvestidor.descricao',
        field: 'perfilInvestidor',
        header: 'Perfil Investidor',    
        maskType: MaskType.substring,
        substringLength: 20,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        // field: 'account.email',
        field: 'accountEmail',
        header: 'Analista Resp.',
        maskType: MaskType.substring,
        substringLength: 15,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
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
