
  export const TipoTransacao = {
  Receita: 2,
  Despesa: 1,
} as const;

export type TipoTransacao =
  (typeof TipoTransacao)[keyof typeof TipoTransacao];


export interface TransacaoDTO
{
    Id: number;
  Descricao: string;
  Valor: number;
  Tipo: TipoTransacao;
  PessoaId: number;
  CategoriaId: number;
}
  // DTO retornado pelo backend
export interface TransacaoResponseDTO {
  Id: number;
  Descricao: string;
  Valor: number;
  Tipo: TipoTransacao;
  PessoaId: number;
  CategoriaId: number;
}

// DTO para criar
export interface TransacaoCreateDTO {
  Descricao: string;
  Valor: number;
  Tipo: TipoTransacao;
  PessoaId: number;
  CategoriaId: number;
}

// DTO para atualizar
export interface TransacaoUpdateDTO {
  Id: number;
  Descricao: string;
  Valor: number;
  Tipo: TipoTransacao;
  PessoaId: number;
  CategoriaId: number;
}
