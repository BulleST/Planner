import { jsonIgnore } from "json-ignore";

export class TipoRisco {
    id: number = undefined as unknown as number;
    nome: string = '';

	@jsonIgnore()
    percentualDisponivel: number = 0;
}