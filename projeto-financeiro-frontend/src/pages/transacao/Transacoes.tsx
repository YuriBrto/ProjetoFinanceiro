import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransacoes, deleteTransacao } from "../../api/transacao.api";
import { getTipoTransacaoByCategoriaId } from "../../api/categoria.cache";
import type { TransacaoDTO } from "../../models/transacao";
import { tipoToLabel, isReceita, isDespesa } from "../../models/transacao";
import Button from "../../components/UI/Button";

export default function Transacoes() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    try {
      setLoading(true);
      setErro(null);
      const data = await getAllTransacoes();

      // ✅ Processar transações: se tipo vazio, buscar da categoria
      const processadas = data.map((transacao) => {
        if (!transacao.tipo || transacao.tipo === "") {
          const tipoInferido = getTipoTransacaoByCategoriaId(transacao.categoriaId);
          if (tipoInferido !== null) {
            transacao.tipo = tipoInferido.toString();
           
          }
        }
        return transacao;
      });

      setTransacoes(processadas);
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
      setTransacoes(transacoes.filter((t) => t.id !== id));
      alert("Transação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar transação", error);
      alert("Erro ao excluir transação.");
    } finally {
      setDeletingId(null);
    }
  }

  const transacoesFiltradas = transacoes.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (t.pessoaNome?.toLowerCase().includes(searchLower) || false) ||
      (t.categoriaDescricao?.toLowerCase().includes(searchLower) || false)
    );
  });

  // ✅ Calcular totais com tipo inferido
  const totalReceitas = transacoesFiltradas
    .filter((t) => isReceita(t.tipo))
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoesFiltradas
    .filter((t) => isDespesa(t.tipo))
    .reduce((sum, t) => sum + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

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
            <p className="text-red-700 font-medium">{erro}</p>
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
            Gerencie todas as transações financeiras
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/transacoes/nova")}
        >
          Nova Transação
        </Button>
      </div>

      {/* Barra de Busca */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
        <input
          type="text"
          placeholder="Buscar por pessoa ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Receitas */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total de Receitas
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                R$ {totalReceitas.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl text-green-200">📈</div>
          </div>
        </div>

        {/* Total Despesas */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total de Despesas
              </p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                R$ {totalDespesas.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl text-red-200">📉</div>
          </div>
        </div>

        {/* Saldo */}
        <div
          className={`${
            saldo >= 0
              ? "bg-blue-50 border-blue-200"
              : "bg-orange-50 border-orange-200"
          } border rounded-xl p-6 shadow hover:shadow-lg transition`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Saldo</p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  saldo >= 0 ? "text-blue-600" : "text-orange-600"
                }`}
              >
                R$ {saldo.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">{saldo >= 0 ? "✅" : "⚠️"}</div>
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pessoa
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transacoesFiltradas.length > 0 ? (
                transacoesFiltradas.map((t) => {
                  const isReceita_local = isReceita(t.tipo);
                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            isReceita_local ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {tipoToLabel(t.tipo)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-lg font-bold ${
                            isReceita_local ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isReceita_local ? "+" : "-"} R$
                          {t.valor.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {t.categoriaDescricao || "N/A"}
                      </td>
                      <td className="px-6 py-4">{t.pessoaNome || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() =>
                              navigate(`/transacoes/editar/${t.id}`)
                            }
                            variant="outline"
                            size="sm"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDelete(t.id)}
                            variant="danger"
                            size="sm"
                            disabled={deletingId === t.id}
                          >
                            {deletingId === t.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Nenhuma transação encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rodapé */}
      <div className="text-center text-sm text-gray-500 pb-4">
        <p>
          Total de transações:{" "}
          <strong>{transacoesFiltradas.length}</strong>
        </p>
      </div>
    </div>
  );
}