import { Empresa } from "./empresa.model";
import { EstadoCivil } from "./estadoCivil.model";
import { PerfilInvestidor } from "./perfilInvestidor.model";

export class Cliente {
    id: number = 0;
    empresa: Empresa = new Empresa;

    empresa_Id: number  = 0

    perfilInvestidor: PerfilInvestidor = new PerfilInvestidor;

    nome: string = '';
    idade: number = '' as unknown as number;
    altura: number = '' as unknown as number;
    peso: number = '' as unknown as number;

    estadoCivil: EstadoCivil = new EstadoCivil;
    
    dataNascimento: Date = new Date;
    cpf: number = '' as unknown as number;
    rg: number = '' as unknown as number;
    email: string = '';
    imc: number = '' as unknown as number;
    receita: number = '' as unknown as number;
    despesa: number = '' as unknown as number;
    
    idadeAposentadoria: number = '' as unknown as number;
    rendaMensalAposentadoria: number = '' as unknown as number;
    rentabilidadeAposentadoria: number = '' as unknown as number;
}
