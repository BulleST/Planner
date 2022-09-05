import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { PerfilInvestidor } from "./perfilInvestidor.model";

export class PercentualRisco {
    id: number = 0;
    empresa_Id: number = 0;
    perfilInvestidor: PerfilInvestidor = undefined as unknown as PerfilInvestidor;
    // perfilInvestidor: string = '';
    perfilInvestidor_Id: number = undefined as unknown as number;
    capacidadeRisco_Id: number = undefined as unknown as number;
    baixissimo: number = '' as unknown as number;
    baixo: number = '' as unknown as number;
    moderado: number = '' as unknown as number;
    arrojado: number = '' as unknown as number;
    superArrojado: number = '' as unknown as number;
    hedge: number = '' as unknown as number;
}


export var percentualRiscoColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined, 
    },
    { 
        field: 'perfilInvestidor.descricao', 
        header: 'Perfil Investidor', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.undefined, 
    },
    { 
        field: 'baixissimo', 
        header: 'Baixissimo', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
    { 
        field: 'baixo', 
        header: 'Baixo', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
    { 
        field: 'moderado', 
        header: 'Moderado', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
    { 
        field: 'arrojado', 
        header: 'Arrojado', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
    { 
        field: 'superArrojado', 
        header: 'Super Arrojado', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
    { 
        field: 'hedge', 
        header: 'Hedge', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        mask: MaskType.percentage, 
        decimal: '1.0-2'
    },
]