import axios from "./axios";

/**
 * DTO das transações recentes
 * Deve bater com o backend (TransacaoRecenteDTO)
 */
export interface TransacaoRecenteDTO {
  descricao: string;
  valor: number;
  tipo: "Receita" | "Despesa";
  pessoaNome: string;
}

/**
 * DTO do relatório por pessoa
 * Deve bater com o backend
 */
export interface TotalPessoaDTO {
  nome: string;
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}

/**
 * Retorna o saldo geral
 */
const obterSaldoGeral = async (): Promise<number> => {
  const response = await axios.get("/Relatorio/saldo");
  return response.data;
};

/**
 * Retorna as transações recentes
 */
const obterTransacoesRecentes = async (): Promise<TransacaoRecenteDTO[]> => {
  const response = await axios.get("/Transacao/recentes");
  return response.data;
};

/**
 * Retorna o total de receitas/despesas agrupado por pessoa
 */
const obterTotaisPorPessoa = async (): Promise<TotalPessoaDTO[]> => {
  const response = await axios.get("/Relatorio/pessoa");
  return response.data;
};

/**
 * Service exportado
 */
export const relatorioService = {
  obterSaldoGeral,
  obterTransacoesRecentes,
  obterTotaisPorPessoa,
};
