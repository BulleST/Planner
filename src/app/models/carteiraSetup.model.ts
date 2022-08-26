import { CarteiraProdutoRel } from "./carteiraSetup-produto.model";
import { Empresa } from "./empresa.model";

export class CarteiraSetup {
    id: number = 0;
    empresa_Id: number = undefined as unknown as number;
    empresa?: Empresa;
    nome: string = '';
    carteiraProdutoRel: CarteiraProdutoRel[] = [];
}