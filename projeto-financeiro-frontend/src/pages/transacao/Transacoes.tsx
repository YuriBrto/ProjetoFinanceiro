import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransacoes, deleteTransacao } from "../../api/transacao.api";
import type { TransacaoDTO } from "../../models/transacao.ts";
import {
  Plus,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  AlertCircle,
  Filter,
} from "lucide-react";
import Button from "../../components/UI/Button";

// Função utilitária para converter o tipo do backend
function tipoTransacaoToString(tipo: number): "Receita" | "Despesa" {
  return tipo === 2 ? "Receita" : "Despesa";
}

export default function Transacoes() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"Todas" | "Receita" | "Despesa">("Todas");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    try {
      setLoading(true);
      setErro(null);
      const data = await getAllTransacoes();
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao carregar transações", error);
      setErro("Erro ao carregar a lista de transações");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta transação?")) return;

    try {
      setDeletingId(id);
      await deleteTransacao(id);
      setTransacoes(transacoes.filter((t) => t.Id !== id));
      alert("Transação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar transação", error);
      alert("Erro ao excluir transação.");
    } finally {
      setDeletingId(null);
    }
  }

  const transacoesFiltradas = transacoes
    .filter((t) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (t.pessoaNome?.toLowerCase().includes(searchLower) || false) ||
        (t.categoriaDescricao?.toLowerCase().includes(searchLower) || false)
      );
    })
    .filter((t) => filtroTipo === "Todas" || tipoTransacaoToString(t.tipo) === filtroTipo);

  const totalReceitas = transacoes
    .filter((t) => tipoTransacaoToString(t.tipo) === "Receita")
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => tipoTransacaoToString(t.tipo) === "Despesa")
    .reduce((sum, t) => sum + t.valor, 0);

  const saldoTotal = totalReceitas - totalDespesas;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando transações...</p>
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
                onClick={carregarTransacoes}
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie todas as transações financeiras ({transacoes.length} {transacoes.length === 1 ? "transação" : "transações"})
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => navigate("/transacoes/nova")}>
          <Plus className="w-5 h-5 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Receitas</p>
              <p className="text-3xl font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <ArrowUpRight className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Despesas</p>
              <p className="text-3xl font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <ArrowDownRight className="text-red-600" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Saldo Total</p>
              <p className="text-3xl font-bold">R$ {saldoTotal.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
              {saldoTotal >= 0 ? <ArrowUpRight size={32} /> : <ArrowDownRight size={32} />}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por pessoa ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <Filter className="text-gray-400 my-auto" size={20} />
            {(["Todas", "Receita", "Despesa"] as const).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  filtroTipo === tipo ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      {transacoesFiltradas.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow border border-gray-100 text-center">
          <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || filtroTipo !== "Todas" ? "Nenhuma transação encontrada" : "Nenhuma transação cadastrada"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filtroTipo !== "Todas" ? "Tente ajustar os filtros de busca" : "Comece cadastrando sua primeira transação"}
          </p>
          {!searchTerm && filtroTipo === "Todas" && (
            <Button variant="primary" onClick={() => navigate("/transacoes/nova")}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Transação
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pessoa</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transacoesFiltradas.map((t) => (
                  <tr key={t.Id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${tipoTransacaoToString(t.tipo) === "Receita" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                          {tipoTransacaoToString(t.tipo) === "Receita" ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </div>
                        <span className={`font-semibold ${tipoTransacaoToString(t.tipo) === "Receita" ? "text-green-600" : "text-red-600"}`}>
                          {tipoTransacaoToString(t.tipo)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-lg font-bold ${tipoTransacaoToString(t.tipo) === "Receita" ? "text-green-600" : "text-red-600"}`}>
                        {tipoTransacaoToString(t.tipo) === "Receita" ? "+" : "-"} R$ {t.valor.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {t.categoriaDescricao || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {t.pessoaNome || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => navigate(`/transacoes/editar/${t.Id}`)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(t.Id)} disabled={deletingId === t.Id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50" title="Excluir">
                          {deletingId === t.Id ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div> : <Trash2 size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
