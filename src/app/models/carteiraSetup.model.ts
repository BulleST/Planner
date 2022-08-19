import { CarteiraProduto_Rel } from "./carteiraSetup-produto.model";

export class CarteiraSetup {
    id: number = 0;
    empresa_Id: number = undefined as unknown as number;
    nome: string = '';
    carteiraProdutoRel: CarteiraProduto_Rel[] = [];
}