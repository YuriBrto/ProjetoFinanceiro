import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTransacoes } from "../../api/transacao.api";
import { getTipoTransacaoByCategoriaId } from "../../api/categoria.cache";
import type { TransacaoDTO } from "../../models/transacao";
import { isReceita, isDespesa, tipoToLabel } from "../../models/transacao";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowRight,
  Plus,
  Calendar,
  DollarSign,
  BarChart3,
  Zap,
} from "lucide-react";

interface DashboardStats {
  saldoGeral: number;
  totalReceitas: number;
  totalDespesas: number;
  transacoes: TransacaoDTO[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    saldoGeral: 0,
    totalReceitas: 0,
    totalDespesas: 0,
    transacoes: [],
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);
      setErro(null);

      // ✅ Buscar todas as transações
      const transacoes = await getAllTransacoes();

      // ✅ Processar transações: se tipo vazio, deduzir da categoria
      const processadas = transacoes.map((t) => {
        if (!t.tipo || t.tipo === "") {
          const tipoInferido = getTipoTransacaoByCategoriaId(t.categoriaId);
          if (tipoInferido !== null) {
            t.tipo = tipoInferido.toString();
          }
        }
        return t;
      });

      // ✅ Calcular totais
      const totalReceitas = processadas
        .filter((t) => isReceita(t.tipo))
        .reduce((sum, t) => sum + t.valor, 0);

      const totalDespesas = processadas
        .filter((t) => isDespesa(t.tipo))
        .reduce((sum, t) => sum + t.valor, 0);

      const saldoGeral = totalReceitas - totalDespesas;

      // ✅ Pegar últimas 5 transações ordenadas por data
      const transacoesRecentes = processadas.slice(0, 5);

      setStats({
        saldoGeral,
        totalReceitas,
        totalDespesas,
        transacoes: transacoesRecentes,
      });
    } catch (error) {
      console.error("Erro ao carregar dashboard", error);
      setErro("Erro ao carregar dados do dashboard");
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
            Carregando seu dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow">
          <p className="text-red-700 font-medium">{erro}</p>
        </div>
      </div>
    );
  }

  const percentualReceitas =
    stats.saldoGeral > 0
      ? ((stats.totalReceitas / (stats.totalReceitas + stats.totalDespesas)) *
          100)
          .toFixed(1)
      : "0";

  return (
    <div className="space-y-8 pb-8">
      {/* ========== HEADER ========== */}
      <div className="relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-20"></div>

        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
          {/* Padrão decorativo */}
          <div className="absolute top-0 right-0 opacity-10">
            <Wallet className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Bem-vindo!</h1>
                <p className="text-indigo-100">
                  Gerencie suas finanças com simplicidade e eficiência
                </p>
              </div>
              <div className="text-indigo-100">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            {/* Saldo Principal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Saldo Geral */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-indigo-100 text-sm font-medium mb-2">
                  Saldo Geral
                </p>
                <h2 className="text-4xl font-bold mb-3">
                  R$ {stats.saldoGeral.toFixed(2)}
                </h2>
                <div className="flex items-center text-indigo-100 text-sm">
                  {stats.saldoGeral >= 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>Você está no positivo!</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span>Atenção ao saldo</span>
                    </>
                  )}
                </div>
              </div>

              {/* Receitas */}
              <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-6 border border-green-400/30">
                <p className="text-green-100 text-sm font-medium mb-2">
                  Total de Receitas
                </p>
                <h2 className="text-4xl font-bold text-green-300 mb-3">
                  R$ {stats.totalReceitas.toFixed(2)}
                </h2>
                <div className="flex items-center text-green-100 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{percentualReceitas}% da receita</span>
                </div>
              </div>

              {/* Despesas */}
              <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-400/30">
                <p className="text-red-100 text-sm font-medium mb-2">
                  Total de Despesas
                </p>
                <h2 className="text-4xl font-bold text-red-300 mb-3">
                  R$ {stats.totalDespesas.toFixed(2)}
                </h2>
                <div className="flex items-center text-red-100 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span>Gastos registrados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== AÇÕES RÁPIDAS ========== */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nova Transação */}
          <button
            onClick={() => navigate("/transacoes/nova")}
            className="group bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl py-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <Plus className="w-6 h-6" />
              <Zap className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bold text-lg text-left">Nova Transação</p>
            <p className="text-indigo-100 text-sm text-left">
              Registre uma movimentação
            </p>
          </button>

          {/* Nova Pessoa */}
          <button
            onClick={() => navigate("/pessoas/nova")}
            className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl py-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <Plus className="w-6 h-6" />
              <Zap className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bold text-lg text-left">Nova Pessoa</p>
            <p className="text-purple-100 text-sm text-left">
              Adicione um novo contato
            </p>
          </button>

          {/* Nova Categoria */}
          <button
            onClick={() => navigate("/categorias/nova")}
            className="group bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-xl py-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <Plus className="w-6 h-6" />
              <Zap className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bold text-lg text-left">Nova Categoria</p>
            <p className="text-pink-100 text-sm text-left">
              Crie uma categoria
            </p>
          </button>
        </div>
      </div>

      {/* ========== TRANSAÇÕES RECENTES ========== */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 rounded-lg p-3">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Transações Recentes
              </h3>
              <p className="text-gray-500 text-sm">
                Últimas movimentações financeiras
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/transacoes")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Ver todas
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Transações */}
        {stats.transacoes.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">
              Nenhuma transação encontrada
            </p>
            <p className="text-gray-500 text-sm">
              Comece registrando sua primeira transação
            </p>
            <button
              onClick={() => navigate("/transacoes/nova")}
              className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Transação
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.transacoes.map((transacao) => {
              const isRec = isReceita(transacao.tipo);
              return (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group cursor-pointer"
                  onClick={() => navigate(`/transacoes/${transacao.id}`)}
                >
                  {/* Informações */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Ícone */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isRec
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isRec ? (
                        <TrendingUp className="w-6 h-6" />
                      ) : (
                        <TrendingDown className="w-6 h-6" />
                      )}
                    </div>

                    {/* Descrição */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {transacao.descricao}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">
                          {transacao.categoriaDescricao}
                        </span>
                        {" • "}
                        <span>{transacao.pessoaNome}</span>
                      </p>
                    </div>
                  </div>

                  {/* Valor e Ação */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          isRec ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isRec ? "+" : "-"} R$ {transacao.valor.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {tipoToLabel(transacao.tipo)}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========== RESUMO VISUAL ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico Resumido */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Proporção Receita vs Despesa
          </h3>

          <div className="space-y-6">
            {/* Receitas */}
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-medium text-gray-700">Receitas</p>
                <p className="font-bold text-green-600">
                  {((stats.totalReceitas /
                    (stats.totalReceitas + stats.totalDespesas)) *
                    100)
                    .toFixed(1)}
                  %
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.totalReceitas /
                      (stats.totalReceitas + stats.totalDespesas)) *
                      100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Despesas */}
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-medium text-gray-700">Despesas</p>
                <p className="font-bold text-red-600">
                  {((stats.totalDespesas /
                    (stats.totalReceitas + stats.totalDespesas)) *
                    100)
                    .toFixed(1)}
                  %
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.totalDespesas /
                      (stats.totalReceitas + stats.totalDespesas)) *
                      100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-sm text-indigo-800">
              <strong>💡 Dica:</strong> Mantenha um equilíbrio entre receitas e
              despesas para melhor controle financeiro.
            </p>
          </div>
        </div>

        {/* Stats Rápidos */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Informações Rápidas
          </h3>

          <div className="space-y-4">
            {/* Total de Transações */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Total de Transações</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.transacoes.length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-indigo-600 opacity-50" />
            </div>

            {/* Receitas */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-green-700 text-sm font-medium">
                  Total de Receitas
                </p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {stats.totalReceitas.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
            </div>

            {/* Despesas */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="text-red-700 text-sm font-medium">
                  Total de Despesas
                </p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {stats.totalDespesas.toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600 opacity-50" />
            </div>

            {/* Status */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg ${
                stats.saldoGeral >= 0
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-orange-50 border border-orange-200"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-medium ${
                    stats.saldoGeral >= 0
                      ? "text-blue-700"
                      : "text-orange-700"
                  }`}
                >
                  Status Financeiro
                </p>
                <p
                  className={`text-2xl font-bold ${
                    stats.saldoGeral >= 0
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  {stats.saldoGeral >= 0 ? "Positivo ✅" : "Negativo ⚠️"}
                </p>
              </div>
              <Wallet
                className={`w-8 h-8 opacity-50 ${
                  stats.saldoGeral >= 0
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}