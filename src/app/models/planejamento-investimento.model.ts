import { InvestimentoTributacaoRel } from "./investimento-tributacao-rel.model";
import { Investimento } from "./investimento.model";
import { Tributacao } from "./tributacao.model";

export class PlanejamentoInvestimento {
    id: number = 0;
    planejamento_Id: number = 0;
    investimentoTributacaoRel_Id: number = undefined as unknown as number;
    investimentoTributacaoRel: InvestimentoTributacaoRel = undefined as unknown as InvestimentoTributacaoRel;
    rentabilidade?: number;
    rentabilidadeLiquida?: number;
    montanteAtual?: number;
    sugerido?: number;
    planoAcao?: number;
}

export class PlanejamentoInvestimentoRequest {
    rentabilidade: number = '' as unknown as number;
    montanteAtual: number = '' as unknown as number;
    investimento: Investimento = new Investimento;
    tributacao: Tributacao = new Tributacao;
}