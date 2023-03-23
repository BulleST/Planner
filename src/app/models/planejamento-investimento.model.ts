import { Investimento } from "./investimento.model";

export class PlanejamentoInvestimento {
    id: number = 0;
    planejamento_Id: number = 0;
    rentabilidade: number = '' as unknown as number;
    rentabilidadeLiquida: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    sugerido: number = '' as unknown as number;
    planoAcao: number = '' as unknown as number;
    custosTaxas: number = '' as unknown as number;
    investimento: Investimento = new Investimento;
    investimento_Id: number = undefined as unknown as number;
}

export class PlanejamentoInvestimentoRequest {
    rentabilidade: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    investimento: Investimento = new Investimento;
}