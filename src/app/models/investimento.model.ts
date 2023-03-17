// import { InvestimentoTributacaoRel } from "./investimento-tributacao-rel.model";
import { TipoAtivo } from "./tipoAtivo.model";
import { TipoLiquidez } from "./tipoLiquidez.model";
import { TipoRisco } from "./tipoRisco.model";

export class Investimento {
    id: number = 0;
    tipoAtivo_Id: number = 0;
    tipoAtivo: TipoAtivo = new TipoAtivo;
    tipoRisco_Id: number = 0;
    tipoRisco: TipoRisco = new TipoRisco;
    tipoLiquidez_Id: number = 0;
    tipoLiquidez: TipoLiquidez = new TipoLiquidez;
    descricao: string = '';
    // investimentoTributacaoRel: InvestimentoTributacaoRel[] = [];
}

