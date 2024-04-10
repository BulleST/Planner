import { jsonIgnore } from "json-ignore";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { PerfilInvestidor } from "./perfilInvestidor.model";
import { ListActions } from "./actions.model";

export class PercentualRisco extends ListActions {
    id: number = 0;
    empresa_Id: number = 0;
    perfilInvestidor: PerfilInvestidor = new PerfilInvestidor;
    perfilInvestidor_Id: number = undefined as unknown as number;
    capacidadeRisco_Id: number = undefined as unknown as number;
    baixissimo: number = '' as unknown as number;
    baixo: number = '' as unknown as number;
    moderado: number = '' as unknown as number;
    arrojado: number = '' as unknown as number;
    superArrojado: number = '' as unknown as number;
    hedge: number = '' as unknown as number;
    total: number = '' as unknown as number;

    @jsonIgnore()
    registroNaoSalvo?: boolean = false; // Se  foi inserida pelo empresa/cadastrar ou empresa/editar
}
export class PercentualRiscoRequest {
    id: number = 0;
    empresa_Id: number = 0;
    perfilInvestidor_Id: number = undefined as unknown as number;
    capacidadeRisco_Id: number = undefined as unknown as number;
    baixissimo: number = '' as unknown as number;
    baixo: number = '' as unknown as number;
    moderado: number = '' as unknown as number;
    arrojado: number = '' as unknown as number;
    superArrojado: number = '' as unknown as number;
    hedge: number = '' as unknown as number;
}

