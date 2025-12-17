// Enum igual ao backend
export const FinalidadeCategoria = {
  Receita: 0,
  Despesa: 1,
} as const;

export type FinalidadeCategoria =
  (typeof FinalidadeCategoria)[keyof typeof FinalidadeCategoria];

 
export interface CategoriaDTO {
  Id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}

/**
 * DTO usado para criação
 */
export interface CategoriaCreateDTO {
  descricao: string;
  finalidade: FinalidadeCategoria;
}

/**
 * DTO usado para atualização
 */
export interface CategoriaUpdateDTO {
  Id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}

/**
 * DTO retornado pela API
 */
export interface CategoriaResponseDTO {
  Id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}
