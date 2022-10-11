import { Tributacao } from "./tributacao.model";

export class InvestimentoTributacaoRel {
    id: number = 0;
    investimento_Id: number = 0;
    tributacao_Id: number = 0;
    tributacao: Tributacao = new Tributacao;
}