export class Login {
    email: string = '';
    password: string = '';
}

export class Register {
    empresa: string = '';
    name: string = '';
    email: string = '';
    telefoneCelular: number = '' as unknown as number;
    password: string = '';
    confirmPassword: string = '';
    acceptTerms: boolean = false;
}

export interface Account {
    id: number;
    name: string;
    telefoneCelular: number;
    email: string;
    role: string;
    created: Date;
    updated?: Date;
    isVerified: boolean;
    jwtToken: string;
    refreshToken: string;
    empresa_Id?: number;
}
export class Account {
    id: number = 0;
    name: string = '';
    telefoneCelular: number = 0;
    email: string = '';
    role: string = '';
    created: Date = new Date;
    updated?: Date;
    isVerified: boolean = false;
    jwtToken: string = '';
    refreshToken: string = '';
}