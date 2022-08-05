
export class Empresa {
    id: number = 0;
    nome: string = '';
    email: string = '';
    cnpj: number = 0;
}

export let empresas: Empresa[] = [
    { id: 1, nome: 'BulleST', cnpj: 123456000165, email: 'bullest@bullest.com.br' },
    { id: 3, nome: 'Planner', cnpj: 223456000168, email: 'planner@planner.com.br' },
];