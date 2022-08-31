import { Empresa } from "./empresa.model";
import { PerfilAcesso } from "./usuario-perfil.model";

export class Usuario {
    id: number = 0;
    empresa_Id: number = 0
    perfilAcesso: PerfilAcesso = new PerfilAcesso;
    perfilAcesso_Id: number = undefined as unknown as number;
    // perfilAcesso: string = '';
    nome: string = '';
    email: string = '';
    senha: string = '';
}


export var userColumns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'nome', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
    { field: 'email', header: 'E-mail', filterType: 'text', filterDisplay: 'menu' },
    { field: 'perfilAcesso.perfil', header: 'Tipo de Acesso', filterType: 'text', filterDisplay: 'menu' },
];


// {
//     "id": 0,
//         "empresa": {
//             "nome": "",
//             "email": "",
//             "cnpj": "",
//             "clientes": [],
//             "usuarios": [],
//             "produtos": [],
//             "carteiraSetup": []
//         },
//         "empresa_Id": 0,
//         "perfilAcesso": {
//             "id": 2,
//             "perfil": "BackOffice",
//             "usuario": [],
//         },
//         "nome": "Noemi Cavalcanti Almeida",
//         "email": "calmeida.no@gmail.com",
//         "senha": "sfsf"
// }


