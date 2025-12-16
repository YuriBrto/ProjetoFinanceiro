import axios from './axios';

/* ===== Tipos ===== */

export interface TotalPessoaDTO {
  nome: string;
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}

export interface TransacaoRecenteDTO {
  descricao: string;
  valor: number;
  tipo: "Receita" | "Despesa";
  pessoaNome: string;
}

/* ===== Service ===== */

export const relatorioService = {
  obterSaldoGeral: async (): Promise<number> => {
    const response = await axios.get<number>(
      "/relatorios/saldo-geral"
    );
    return response.data;
  },

  obterTotaisPorPessoa: async (): Promise<TotalPessoaDTO[]> => {
    const response = await axios.get<TotalPessoaDTO[]>(
      "/relatorios/totais-por-pessoa"
    );
    return response.data;
  },

  obterTransacoesRecentes: async (): Promise<TransacaoRecenteDTO[]> => {
    const response = await axios.get<TransacaoRecenteDTO[]>(
      "/transacoes/recentes?limite=5"
    );
    return response.data;
  },
};
