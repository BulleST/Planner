import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Empresa } from "./empresa.model";
import { EstadoCivil } from "./estadoCivil.model";
import { PerfilInvestidor } from "./perfilInvestidor.model";

export class Cliente {
    id: number = 0;
    empresa: Empresa = new Empresa;
    empresa_Id: number = undefined as unknown as number;
    perfilInvestidor: PerfilInvestidor = new PerfilInvestidor;
    perfilInvestidor_Id: number = undefined as unknown as number;
    nome: string = '';
    idade: number = '' as unknown as number;
    altura: number = '' as unknown as number;
    peso: number = '' as unknown as number;
    estadoCivil: EstadoCivil = new EstadoCivil;
    estadoCivil_Id: number = undefined as unknown as number;
    dataNascimento: Date = new Date;
    cpf: number = '' as unknown as number;
    rg: number = '' as unknown as number;
    email: string = '';
    imc: number = '' as unknown as number;
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
    }, {
        field: 'nome', 
        header: 'Nome', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        field: 'cpf', 
        header: 'CPF', 
        maskType: MaskType.cpf,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        field: 'rg', 
        header: 'RG', 
        maskType: MaskType.rg,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        field: 'dataNascimento', 
        header: 'Data de Nascimento', 
        maskType: MaskType.date,
        filterType: FilterType.date, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.DATE_IS,
    }, {
        field: 'idade', 
        header: 'Idade', 
        maskType: MaskType.undefined,
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        field: 'estadoCivil.descricao', 
        header: 'Estado Civil', 
        maskType: MaskType.undefined,
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }, {
        field: 'perfilInvestidor.descricao', 
        header: 'Perfil Investidor', 
        maskType: MaskType.undefined,
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
]
