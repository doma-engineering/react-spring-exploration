export enum PayMethod {
    base = 'base',
    advanced = 'advanced',
    premium = 'premium',
    none = '',
}

export type RegistrationForm1Data = {
    company: string;
    card: string;
    payMethod: PayMethod;
};

export type RegistrationForm2Data = {
    email: string;
    password: string;
};

export type RegistrationData = {
    company: string;
    card: string;
    payMethod: PayMethod;
    email: string;
    password: string;
};
