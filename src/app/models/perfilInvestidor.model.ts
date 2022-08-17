export class PerfilInvestidor {
    id: number = undefined as unknown as number;
    riscoMaximo: number = 0;
    mesesReserva: number = 0;
    descricao: string = '';
}

export var perfilInvestidor: PerfilInvestidor[] = [
    { id: 1, riscoMaximo: 20, mesesReserva: 12, descricao: 'Super Conservador (até 20% do patrimônio em Risco)' },
    { id: 2, riscoMaximo: 30, mesesReserva: 9, descricao: 'Conservador (de 20% à 30% do patrimônio em Risco)' },
    { id: 3, riscoMaximo: 50, mesesReserva: 6, descricao: 'Moderado (de 30% à 50% do patrimônio em Risco)' },
    { id: 4, riscoMaximo: 80, mesesReserva: 4, descricao: 'Arrojado (de 50% à 80% do patrimônio em Risco)' },
    { id: 5, riscoMaximo: 100, mesesReserva: 3, descricao: 'Super Arrojado (100% do patrimônio em Risco)' },
]