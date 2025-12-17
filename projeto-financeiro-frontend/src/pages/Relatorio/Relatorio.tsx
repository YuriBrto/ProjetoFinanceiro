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
  RefreshCw,
} from "lucide-react";

export default function Relatorios() {
  const [saldoGeral, setSaldoGeral] = useState<number>(0);
  const [totalReceitas, setTotalReceitas] = useState<number>(0);
  const [totalDespesas, setTotalDespesas] = useState<number>(0);
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

      // ✅ Usar método que retorna tudo junto
      const relatorio = await relatorioService.obterRelatorioCompleto();

      setSaldoGeral(relatorio.saldoGeral);
      setTotalReceitas(relatorio.totalReceitas);
      setTotalDespesas(relatorio.totalDespesas);
      setTotaisPorPessoa(relatorio.pessoas);

    } catch (error) {
      console.error("❌ Erro ao carregar relatórios:", error);
      setErro(
        "Erro ao carregar os relatórios. Tente recarregar a página."
      );
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

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Relatórios Financeiros
          </h1>
          <p className="text-gray-600 mt-2">
            Análise completa das suas finanças
          </p>
        </div>
        <button
          onClick={carregarRelatorios}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          Atualizar
        </button>
      </div>

      {/* Erro */}
      {erro && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-800">Erro ao Carregar</h3>
              <p className="mt-2 text-sm text-red-700">{erro}</p>
              <button
                onClick={carregarRelatorios}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards de Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Saldo Geral */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-8 shadow-xl col-span-1 md:col-span-4">
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
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg ${
                saldoGeral >= 0
                  ? "bg-green-500/30 text-green-100"
                  : "bg-red-500/30 text-red-100"
              }`}
            >
              {saldoGeral >= 0 ? (
                <>
                  <TrendingUp size={24} />
                  Positivo
                </>
              ) : (
                <>
                  <TrendingDown size={24} />
                  Negativo
                </>
              )}
            </div>
          </div>
        </div>

        {/* Total Receitas */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-green-300 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <ArrowUpRight className="text-green-600" size={28} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              RECEITAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total de Receitas</p>
          <p className="text-3xl font-bold text-green-600">
            R${" "}
            {totalReceitas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* Total Despesas */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-red-300 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <ArrowDownRight className="text-red-600" size={28} />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              DESPESAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total de Despesas</p>
          <p className="text-3xl font-bold text-red-600">
            R${" "}
            {totalDespesas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* Quantidade de Pessoas */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-indigo-300 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Users className="text-indigo-600" size={28} />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              PESSOAS
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total de Pessoas</p>
          <p className="text-3xl font-bold text-indigo-600">
            {totaisPorPessoa.length}
          </p>
        </div>
      </div>

      {/* Detalhamento por Pessoa */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <BarChart3 className="text-indigo-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Detalhamento por Pessoa
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Análise individual de receitas e despesas
              </p>
            </div>
          </div>
        </div>

        {totaisPorPessoa.length === 0 ? (
          <div className="p-16 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum dado disponível
            </h3>
            <p className="text-gray-500 mb-6">
              Cadastre transações para visualizar os relatórios detalhados
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-indigo-600">
              <BarChart3 className="w-4 h-4" />
              Aguardando dados...
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="space-y-6">
              {totaisPorPessoa.map((pessoa) => {
                // ✅ REMOVIDO: const totalGeral = totalReceitas + totalDespesas || 1;
                
                const percentualReceita =
                  totalReceitas > 0
                    ? (pessoa.totalReceita / totalReceitas) * 100
                    : 0;
                const percentualDespesa =
                  totalDespesas > 0
                    ? (pessoa.totalDespesa / totalDespesas) * 100
                    : 0;

                return (
                  <div
                    key={pessoa.id || pessoa.nome}
                    className="border border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all"
                  >
                    {/* Header da Pessoa */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            {pessoa.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {pessoa.nome}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Análise Financeira Individual
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">Saldo Final</p>
                        <p
                          className={`text-3xl font-bold ${
                            pessoa.saldo >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          R${" "}
                          {pessoa.saldo.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Cards de Receita e Despesa */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <p className="text-xs text-green-600 font-semibold mb-1">
                          RECEITAS
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          R${" "}
                          {pessoa.totalReceita.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <p className="text-xs text-red-600 font-semibold mb-1">
                          DESPESAS
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          R${" "}
                          {pessoa.totalDespesa.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Gráficos de Barra */}
                    <div className="space-y-6">
                      {/* Receitas */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <ArrowUpRight
                              className="text-green-600"
                              size={20}
                            />
                            <span className="font-semibold text-gray-700">
                              Receitas
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-600">
                            {percentualReceita.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-sm">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${percentualReceita}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Despesas */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <ArrowDownRight
                              className="text-red-600"
                              size={20}
                            />
                            <span className="font-semibold text-gray-700">
                              Despesas
                            </span>
                          </div>
                          <span className="text-sm font-bold text-red-600">
                            {percentualDespesa.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-sm">
                          <div
                            className="bg-gradient-to-r from-red-400 to-red-600 h-4 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${percentualDespesa}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Badge de Status */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      {pessoa.saldo >= 0 ? (
                        <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-4 py-3 rounded-lg w-fit border border-green-200">
                          <TrendingUp size={18} />
                          Situação Positiva ✅
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm font-medium text-red-700 bg-red-50 px-4 py-3 rounded-lg w-fit border border-red-200">
                          <TrendingDown size={18} />
                          Atenção: Saldo Negativo ⚠️
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

      {/* Dica Final */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-xl p-6">
        <h3 className="font-bold text-indigo-900 mb-2">💡 Dica de Análise</h3>
        <p className="text-indigo-800 text-sm">
          Compare o percentual de receitas e despesas por pessoa para entender
          melhor a distribuição financeira. Pessoas com maior percentual de
          receitas contribuem mais positivamente para o saldo geral.
        </p>
      </div>
    </div>
  );
}