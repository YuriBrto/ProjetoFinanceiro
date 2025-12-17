export interface PessoaDTO{
    id: number;
    nome: string;
    idade: number;
}

export interface PessoaCreateDTO{
    nome: string;
    idade: number;
}

export interface PessoaUpdateDTO{
    id: number;
    nome: string;
    idade: number;
}

export interface PessoaResponseDTO{
    id: number;
    nome: string;
    idade: number;
}

