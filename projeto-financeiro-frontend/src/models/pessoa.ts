export interface PessoaDTO{
    Id: number;
    nome: string;
    idade: number;
}

export interface PessoaCreateDTO{
    nome: string;
    idade: number;
}

export interface PessoaUpdateDTO{
    Id: number;
    nome: string;
    idade: number;
}

export interface PessoaResponseDTO{
    Id: number;
    nome: string;
    idade: number;
}

