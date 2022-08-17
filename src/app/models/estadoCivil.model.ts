export class EstadoCivil {
    id: number = undefined as unknown as number;
    descricao: string = '';
}

export var estadoCivil: EstadoCivil[] = [
    { id: 1, descricao: 'Solteiro(a)' },
    { id: 2, descricao: 'Casado(a) (Comunhão Parcial)' },
    { id: 3, descricao: 'Casado(a) (Comunhão Universal)' },
    { id: 4, descricao: 'Casado(a) (Separação Total)' },
    { id: 5, descricao: 'União Estável' },
    { id: 6, descricao: 'Viúvo(a)' },
];