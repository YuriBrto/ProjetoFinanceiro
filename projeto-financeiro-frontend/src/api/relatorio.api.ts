import axiosInstance from "./axios";
import { getAllTransacoes } from "./transacao.api";
import { isReceita, isDespesa } from "../models/transacao";
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
  id?: number;
  nome: string;
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}

/**
 * DTO do relatório geral
 */
export interface RelatorioGeralDTO {
  saldoGeral: number;
  totalReceitas: number;
  totalDespesas: number;
}

class RelatorioService {
  /**
   * Retorna o saldo geral
   */
  async obterSaldoGeral(): Promise<number> {
    try {
      const response = await axiosInstance.get("/relatorio/saldo");
 
      //  Tratamento flexível: pode ser um número ou um objeto
      return typeof response.data === "number" ? response.data : response.data?.saldoGeral || 0;
    } catch (error) {
      console.error("❌ Erro ao obter saldo geral:", error);
      return 0;
    }
  }

  /**
   * Retorna as transações recentes
   */
  async obterTransacoesRecentes(): Promise<TransacaoRecenteDTO[]> {
    try {
      const response = await axiosInstance.get("/transacao/recentes");
     
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("❌ Erro ao obter transações recentes:", error);
      return [];
    }
  }

  /**
   * Retorna o total de receitas/despesas agrupado por pessoa
   */
  async obterTotaisPorPessoa(): Promise<TotalPessoaDTO[]> {
    try {
      const response = await axiosInstance.get("/relatorio/pessoa");
  

      // Se for array, usar diretamente
      if (Array.isArray(response.data)) {
        return response.data;
      }

      // ✅ Se for objeto com propriedade data, usar essa
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      console.error("❌ Erro ao obter totais por pessoa:", error);
      return [];
    }
  }

  /**
   * Obter todos os dados de relatório em uma única chamada
   */
  
async obterRelatorioCompleto(): Promise<{
  saldoGeral: number;
  totalReceitas: number;
  totalDespesas: number;
  pessoas: TotalPessoaDTO[];
}> {
  try {
    const transacoes = await getAllTransacoes();

    let totalReceitas = 0;
    let totalDespesas = 0;

    const mapaPessoas = new Map<string, TotalPessoaDTO>();

    for (const t of transacoes) {
      const nome = t.pessoaNome || "Sem Pessoa";

      if (!mapaPessoas.has(nome)) {
        mapaPessoas.set(nome, {
          nome,
          totalReceita: 0,
          totalDespesa: 0,
          saldo: 0,
        });
      }

      const pessoa = mapaPessoas.get(nome)!;

      if (isReceita(t.tipo)) {
        totalReceitas += t.valor;
        pessoa.totalReceita += t.valor;
      } else if (isDespesa(t.tipo)) {
        totalDespesas += t.valor;
        pessoa.totalDespesa += t.valor;
      }

      pessoa.saldo = pessoa.totalReceita - pessoa.totalDespesa;
    }

    return {
      totalReceitas,
      totalDespesas,
      saldoGeral: totalReceitas - totalDespesas,
      pessoas: Array.from(mapaPessoas.values()),
    };
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return {
      saldoGeral: 0,
      totalReceitas: 0,
      totalDespesas: 0,
      pessoas: [],
    };
  }
}}
/**
 * Service exportado
 */
export const relatorioService = new RelatorioService();