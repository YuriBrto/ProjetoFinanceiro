// Enum com valores do backend
export const TipoTransacao = {
  Despesa: 1,
  Receita: 2,
} as const;

export type TipoTransacaoEnum = (typeof TipoTransacao)[keyof typeof TipoTransacao];

export interface TransacaoDTO {
  id: number;
  descricao: string;
  valor: number;
  tipo: string | number;
  pessoaId: number;
  pessoaNome: string;
  categoriaId: number;
  categoriaDescricao: string;
}

export interface TransacaoCreateDTO {
  descricao: string;
  valor: number;
  pessoaId: number;
  categoriaId: number;
  tipo: number;
}

export interface TransacaoUpdateDTO {
  descricao: string;
  valor: number;
  pessoaId: number;
  categoriaId: number;
  tipo: number;
}

// Converter qualquer tipo para número com tratamento de valores inválidos
export function tipoToNumber(tipo: string | number | null | undefined): TipoTransacaoEnum {
  // Se for nulo ou indefinido, assume Despesa como padrão
  if (tipo === null || tipo === undefined || tipo === "") {
    console.warn("⚠️ Tipo inválido recebido:", tipo, "usando Despesa como padrão");
    return 1; // Despesa como padrão
  }

  if (typeof tipo === "number") {
    if (tipo === 1 || tipo === 2) return tipo as TipoTransacaoEnum;
    console.warn("⚠️ Tipo numérico inválido:", tipo);
    return 1; // Despesa como padrão
  }

  if (typeof tipo === "string") {
    switch (tipo.toLowerCase().trim()) {
      case "despesa":
        return 1;
      case "receita":
        return 2;
      case "1":
        return 1;
      case "2":
        return 2;
      default:
        console.warn("⚠️ Tipo string inválido:", tipo);
        return 1; // Despesa como padrão
    }
  }

  return 1; // Despesa como padrão
}

// ✅ Converter tipo para label com tratamento seguro
export function tipoToLabel(tipo: string | number | null | undefined): "Receita" | "Despesa" {
  const num = tipoToNumber(tipo);
  return num === 2 ? "Receita" : "Despesa";
}

// ✅ Verificar se é receita (tipo === 2)
export function isReceita(tipo: string | number | null | undefined): boolean {
  return tipoToNumber(tipo) === 2;
}

// ✅ Verificar se é despesa (tipo === 1)
export function isDespesa(tipo: string | number | null | undefined): boolean {
  return tipoToNumber(tipo) === 1;
}