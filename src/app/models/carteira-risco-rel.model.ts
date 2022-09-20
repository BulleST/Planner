import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { TipoRisco } from "./tipoRisco.model";

export class CarteiraRiscoRel {
    id: number = 0;
    carteiraSetup_Id: number = 0;
    percentual: number = undefined as unknown as number;
    tipoRisco_Id: number = undefined as unknown as number;
    tipoRisco: TipoRisco = undefined as unknown as TipoRisco;
}

export var carteiraRiscoColumns: Column[] = [
    { 
        field: 'id', 
        header: 'Id', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
    },
    { 
        field: 'tipoRisco.nome', 
        header: 'Tipo de Risco', 
        filterType: FilterType.text, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
    },
    { 
        field: 'percentual', 
        header: 'Percentual', 
        filterType: FilterType.numeric, 
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.percentage,
        decimal: '1.2'
    },

];
