export class PlanejamentoAgregandoValor {
    id: number = 0;
    planejamento_Id: number = 0;
    riscoAssumido?: number;
    montante: number = 0;
   
    rentabilidade_Atual?: number;
    rentabilidade_Sugerida?: number;
    rentabilidade_Diferenca?: number;

    retornoAnual_Atual?: number;
    retornoAnual_Sugerido?: number;
    retornoAnual_Diferenca?: number;

    retornoMensal_Atual?: number;
    retornoMensal_Sugerido?: number;
    retornoMensal_Diferenca?: number;

    plMax_Atual?: number;
    plMax_Sugerido?: number;
    plMax_Diferenca?: number;

    idadeMax_Atual?: number;
    idadeMax_Sugerido?: number;
    idadeMax_Diferenca?: number;

    pL_Desempenho?: number;
    idade_Desempenho?: number;
}