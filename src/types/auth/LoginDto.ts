export interface LoginDto {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface AccountDto {
    id: string;
    username: string;
    role: string;
    image: string;
    isActive: boolean;
    fullname: string;
    gender: boolean;
    phone: string;
    email: string;
    address: string;
    birthday: Date;
}

export interface AccountCreateDto {
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
    image: string;
    isActive: boolean;
    fullname: string;
    gender: boolean;
    phone: string;
    email: string;
    address: string;
    birthday: Date;
    file: File;
}
