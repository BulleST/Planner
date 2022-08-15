import { Empresa } from "./empresa.model";
import { PerfilAcesso } from "./usuario-perfil.model";

export class Usuario {
    
    id: number = 0;

    empresa_Id: number = 0;
    empresa: Empresa = new Empresa;
    
    perfil_Id: number = 0;
    perfil: PerfilAcesso = new PerfilAcesso;

    nome: string = '';
    email: string = '';
    senha: string = '';
}