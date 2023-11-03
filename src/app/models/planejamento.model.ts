import { Account } from "./account.model";
import { CarteiraSetup } from "./carteiraSetup.model";
import { Cliente } from "./cliente.model";
import { FluxosPontuais } from "./fluxosPontuais.model";
import { PrincipaisObjetivos } from "./objetivos.model";
import { PlanejamentoAgregandoValor } from "./planejamento-agregandoValor.model";
import { PlanejamentoInvestimento } from "./planejamento-investimento.model";
import { PlanejamentoProduto } from "./planejamento-produto.model";
import { PlanejamentoGrafico } from "./planejamentoGrafico.model";

export class Planejamento {
    id: number = 0;
    cliente_Id: number = 0;
    cliente: Cliente = new Cliente;
    account_Id: number = 0;
    account: Account = new Account;
    carteiraSetup_Id: number = undefined as unknown as number;
    carteiraSetup: CarteiraSetup = undefined as unknown as CarteiraSetup;
    data: Date = new Date;
    descricao: string = '';
    
    taxaSelic: number = '' as unknown as number;
    taxaIpca: number = '' as unknown as number;

    cm: boolean = false;
    
    rE_Sugerido: number = '' as unknown as number; // re = Reserva de Emergência
    rE_Planejado: number = '' as unknown as number; // re = Reserva de Emergência

    riscoAssumido: number = '' as unknown as number;
    riscoTolerado: number = '' as unknown as number;
    
    sugestao_Baixissimo: number = '' as unknown as number;
    sugestao_Baixo: number = '' as unknown as number;
    sugestao_Moderado: number = '' as unknown as number;
    sugestao_Arrojado: number = '' as unknown as number;
    sugestao_SuperArrojado: number = '' as unknown as number;
    sugestao_Hedge: number = '' as unknown as number;
    sugestao_Total: number = '' as unknown as number;

    plano_Baixissimo: number = '' as unknown as number;
    plano_Baixo: number = '' as unknown as number;
    plano_Moderado: number = '' as unknown as number;
    plano_Arrojado: number = '' as unknown as number;
    plano_SuperArrojado: number = '' as unknown as number;
    plano_Hedge: number = '' as unknown as number;
    plano_Total: number = '' as unknown as number;
    
    atual_Total: number = 0;
    atual_RentabilidadeMedia: number = 0;
    atual_RentabilidadeReal: number = 0;
    sugerido_Total: number = 0;
    
    planoAcao_Total: number = 0;
    planoAcao_RentabilidadeMedia: number = 0;
    planoAcao_RentabilidadeReal: number = 0;

    planejamentoAgregandoValor: PlanejamentoAgregandoValor = new PlanejamentoAgregandoValor;
    planejamentoGrafico: PlanejamentoGrafico[] = [];
    planejamentoInvestimento: PlanejamentoInvestimento[] = [];
    planejamentoProduto: PlanejamentoProduto[] = [];
    planejamentoFluxosPontuais: FluxosPontuais[] = []; 
    principaisObjetivos: PrincipaisObjetivos[] = [];
}