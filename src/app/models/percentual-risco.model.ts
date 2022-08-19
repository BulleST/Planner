import { PerfilInvestidor } from "./perfilInvestidor.model";

export class PercentualRisco {
    id: number = 0;
    empresa_Id: number = 0;
    perfilInvestidor: PerfilInvestidor = undefined as unknown as PerfilInvestidor;
    perfilInvestidor_Id: number = undefined as unknown as number;
    capacidadeRisco_Id: number = undefined as unknown as number;
    baixissimo: number = '' as unknown as number;
    baixo: number = '' as unknown as number;
    moderado: number = '' as unknown as number;
    arrojado: number = '' as unknown as number;
    superArrojado: number = '' as unknown as number;
    hedge: number = '' as unknown as number;
}


export var percentualRiscoColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'perfilInvestidor.descricao', header: 'Perfil Investidor', filterType: 'text', filterDisplay: 'menu' },
    { field: 'baixissimo', header: 'Baixissimo', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'baixo', header: 'Baixo', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'moderado', header: 'Moderado', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'arrojado', header: 'Arrojado', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'superArrojado', header: 'Super Arrojado', filterType: 'numeric', filterDisplay: 'menu' },
    { field: 'hedge', header: 'Hedge', filterType: 'numeric', filterDisplay: 'menu' },
]