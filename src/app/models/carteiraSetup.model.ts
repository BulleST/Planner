import { CarteiraProdutoRel } from "./carteiraSetup-produto.model";
import { Empresa } from "./empresa.model";

export class CarteiraSetup {
    id: number = 0;
    empresa_Id?: number;
    nome: string = '';
    carteiraProdutoRel: CarteiraProdutoRel[] = [];
}