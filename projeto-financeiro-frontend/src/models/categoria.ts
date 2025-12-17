// Enum com valores do backend
export const FinalidadeCategoria = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

export type FinalidadeCategoria =
  (typeof FinalidadeCategoria)[keyof typeof FinalidadeCategoria];

// ✅ DTO que vem do backend (pode ter string)
export interface CategoriaDTO {
  id: number;
  descricao: string;
  finalidade: string | number; // ✅ Aceita ambos
}

// ✅ DTO processado (sempre número)
export interface CategoriaDTOProcessed extends Omit<CategoriaDTO, 'finalidade'> {
  finalidade: FinalidadeCategoria; // ✅ Sempre número
}

export interface CategoriaCreateDTO {
  descricao: string;
  finalidade: FinalidadeCategoria;
}

export interface CategoriaUpdateDTO {
  id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}

export interface CategoriaResponseDTO {
  id: number;
  descricao: string;
  finalidade: string | number;
}

// ✅ Helper para converter qualquer finalidade para número
export function finalidadeToNumber(finalidade: FinalidadeCategoria | string | number): FinalidadeCategoria {
  if (typeof finalidade === "number") return finalidade as FinalidadeCategoria;
  if (typeof finalidade === "string") {
    switch (finalidade.toLowerCase()) {
      case "despesa":
        return 1;
      case "receita":
        return 2;
      case "ambas":
        return 3;
      default:
        return 1;
    }
  }
  return 1;
}

// ✅ Helper para converter finalidade para label
export function finalidadeToLabel(finalidade: FinalidadeCategoria | string | number): "Receita" | "Despesa" | "Ambas" {
  const num = finalidadeToNumber(finalidade);
  switch (num) {
    case 1:
      return "Despesa";
    case 2:
      return "Receita";
    case 3:
      return "Ambas";
    default:
      return "Ambas";
  }
}

// ✅ Processar categoria do backend para usar no frontend
export function processarCategoria(categoria: CategoriaDTO): CategoriaDTOProcessed {
  return {
    ...categoria,
    finalidade: finalidadeToNumber(categoria.finalidade),
  };
}



export interface CategoriaDTOProcessed extends Omit<CategoriaDTO, 'finalidade'> {
  finalidade: FinalidadeCategoria; //  Sempre número (1=Despesa, 2=Receita, 3=Ambas)
}

//  Helper para converter finalidade para tipo de transação
export function finalidadeToTipoTransacao(finalidade: FinalidadeCategoria | string | number): 1 | 2 {
  const num = finalidadeToNumber(finalidade);
  
  switch (num) {
    case 1: // Despesa
      return 1;
    case 2: // Receita
      return 2;
    case 3: // Ambas - retorna Despesa por padrão
      return 1;
    default:
      return 1;
  }
}