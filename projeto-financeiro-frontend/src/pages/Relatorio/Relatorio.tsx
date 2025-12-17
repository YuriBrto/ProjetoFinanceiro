import { useEffect, useState } from "react";
import { relatorioService } from "../../api/relatorio.api";
import type { TotalPessoaDTO } from "../../api/relatorio.api";
import {
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import axios from "axios";

export default function Relatorios() {
  const [saldoGeral, setSaldoGeral] = useState<number>(0);
  const [totaisPorPessoa, setTotaisPorPessoa] = useState<TotalPessoaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  async function carregarRelatorios() {
  try {
    setLoading(true);
    setErro(null);

    const [saldo, pessoas] = await Promise.all([
      relatorioService.obterSaldoGeral(),
      relatorioService.obterTotaisPorPessoa(),
    ]);

    setSaldoGeral(saldo);
    setTotaisPorPessoa(pessoas);
  } catch (error) {
    console.error("Erro ao carregar relatórios", error);

    if (axios.isAxiosError(error)) {
      setErro(
        error.response?.data?.message ??
          "Erro ao carregar os relatórios."
      );
    } else {
      setErro("Erro inesperado ao carregar os relatórios.");
    }
  } finally {
    setLoading(false);
  }
}


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Carregando relatórios...
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-800">Erro</h3>
              <p className="mt-2 text-sm text-red-700">{erro}</p>
              <button
                onClick={carregarRelatorios}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalReceitas = totaisPorPessoa.reduce(
    (sum, p) => sum + p.totalReceita,
    0
  );
  const totalDespesas = totaisPorPessoa.reduce(
    (sum, p) => sum + p.totalDespesa,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Relatórios Financeiros
        </h1>
        <p className="text-gray-600 mt-1">
          Análise detalhada das suas finanças
        </p>
      </div>

      {/* Cards de Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Saldo Geral */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-xl col-span-1 md:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur">
                <Wallet size={36} />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">
                  Saldo Geral
                </p>
                <h2 className="text-5xl font-bold tracking-tight">
                  R${" "}
                  {saldoGeral.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                saldoGeral >= 0
                  ? "bg-green-500/30"
                  : "bg-red-500/30"
              }`}
            >
              {saldoGeral >= 0 ? (
                <TrendingUp size={24} />
              ) : (
                <TrendingDown size={24} />
              )}
              <span className="font-semibold">
                {saldoGeral >= 0 ? "Positivo" : "Negativo"}
              </span>
            </div>
          </div>
        </div>

        {/* Total Receitas */}
        <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <ArrowUpRight
                className="text-green-600"
                size={28}
              />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              RECEITAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            Total de Receitas
          </p>
          <p className="text-3xl font-bold text-green-600">
            R$ {totalReceitas.toFixed(2)}
          </p>
        </div>

        {/* Total Despesas */}
        <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <ArrowDownRight
                className="text-red-600"
                size={28}
              />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              DESPESAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            Total de Despesas
          </p>
          <p className="text-3xl font-bold text-red-600">
            R$ {totalDespesas.toFixed(2)}
          </p>
        </div>

        {/* Quantidade de Pessoas */}
        <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Users
                className="text-indigo-600"
                size={28}
              />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              PESSOAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            Total de Pessoas
          </p>
          <p className="text-3xl font-bold text-indigo-600">
            {totaisPorPessoa.length}
          </p>
        </div>
      </div>

      {/* Detalhamento por Pessoa */}
      {/* ⬇️ TODO o restante do JSX permanece exatamente igual */}

      {/* Detalhamento por Pessoa */}
      <div className="bg-white rounded-xl shadow border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-indigo-600" size={28} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Detalhamento por Pessoa
              </h2>
              <p className="text-sm text-gray-500">
                Análise individual de receitas e despesas
              </p>
            </div>
          </div>
        </div>

        {totaisPorPessoa.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum dado disponível
            </h3>
            <p className="text-gray-500">
              Cadastre transações para visualizar os relatórios
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-6">
              {totaisPorPessoa.map((pessoa, index) => {
                const percentualReceita = totalReceitas > 0 
                  ? (pessoa.totalReceita / totalReceitas) * 100 
                  : 0;
                const percentualDespesa = totalDespesas > 0 
                  ? (pessoa.totalDespesa / totalDespesas) * 100 
                  : 0;

                return (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition">
                    {/* Header da Pessoa */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-xl">
                            {pessoa.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {pessoa.nome}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Análise Financeira Individual
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Saldo Final</p>
                        <p
                          className={`text-2xl font-bold ${
                            pessoa.saldo >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          R$ {pessoa.saldo.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Gráficos de Barra */}
                    <div className="space-y-4">
                      {/* Receitas */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ArrowUpRight className="text-green-600" size={18} />
                            <span className="text-sm font-semibold text-gray-700">
                              Receitas
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-600">
                            R$ {pessoa.totalReceita.toFixed(2)} ({percentualReceita.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentualReceita}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Despesas */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ArrowDownRight className="text-red-600" size={18} />
                            <span className="text-sm font-semibold text-gray-700">
                              Despesas
                            </span>
                          </div>
                          <span className="text-sm font-bold text-red-600">
                            R$ {pessoa.totalDespesa.toFixed(2)} ({percentualDespesa.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentualDespesa}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Badge de Status */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {pessoa.saldo >= 0 ? (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg w-fit">
                          <TrendingUp size={16} />
                          <span className="font-medium">Situação Positiva</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg w-fit">
                          <TrendingDown size={16} />
                          <span className="font-medium">Atenção: Saldo Negativo</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}