export type TipoTransacao = 'RECEITA' | 'DESPESA';
export interface TransacaoDTO {
    Id: number;
  valor: number;
  descricao: string;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
}

export interface TransacaoCreateDTO {
  valor: number;
  descricao: string;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
}

export interface TransacaoUpdateDTO {
    Id: number;
  valor: number;
  descricao: string;
  tipo: TipoTransacao;
  categoriaId: number;
  pessoaId: number;
}
export interface TransacaoResponseDTO {
  id: number;
  valor: number;
  descricao: string;
  tipo: string;
  categoriaId: number;
  pessoaId: number;
}   