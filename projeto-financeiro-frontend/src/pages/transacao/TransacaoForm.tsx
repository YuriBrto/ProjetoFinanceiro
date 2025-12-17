import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTransacao,
  getTransacaoById,
  updateTransacao,
} from "../../api/transacao.api";
import { getAllPessoas } from "../../api/pessoa.api";
import { getAllCategorias } from "../../api/categoria.api";
import type { PessoaDTO } from "../../models/pessoa";
import type { CategoriaDTO } from "../../models/categoria";
import { finalidadeToLabel, finalidadeToNumber } from "../../models/categoria";
import axios from "axios";

export default function TransacaoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");

  // Estados auxiliares
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingData(true);
        setErro(null);

        // Carregar pessoas e categorias em paralelo
        const [pessoasData, categoriasData] = await Promise.all([
          getAllPessoas(),
          getAllCategorias(),
        ]);

      

        setPessoas(pessoasData || []);
        setCategorias(categoriasData || []);

        // Se estiver editando, carregar transação
        if (id) {
          try {
            const transacao = await getTransacaoById(Number(id));
            setDescricao(transacao.descricao || "");
            setValor(transacao.valor.toString());
            setCategoriaId(String(transacao.categoriaId));
            setPessoaId(String(transacao.pessoaId));
          } catch (transacaoError) {
            console.error("Erro ao carregar transação:", transacaoError);
            setErro("Erro ao carregar dados da transação");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Erro ao carregar dados do formulário");
      } finally {
        setLoadingData(false);
      }
    };

    loadInitialData();
  }, [id]);

  // ✅ FUNÇÃO AUXILIAR: Obter tipo da categoria selecionada
  const getCategoriaTipo = (): number | null => {
    if (!categoriaId) return null;
    const categoria = categorias.find((c) => String(c.id) === String(categoriaId));
    if (!categoria) return null;

    // ✅ Converter a finalidade para número (pode vir como string ou número)
    const finalidadeNum = finalidadeToNumber(categoria.finalidade);
   

    // ✅ Mapear diretamente a finalidade
    // Finalidade: 1 = Despesa, 2 = Receita, 3 = Ambas (enviar como Receita)
    switch (finalidadeNum) {
      case 1:
        return 1; // Despesa
      case 2:
        return 2; // Receita
      case 3:
        return 2; // Ambas = Tratar como Receita por padrão
      default:
        return 1; // Padrão: Despesa
    }
  };

  // ✅ FUNÇÃO AUXILIAR: Obter label do tipo para exibição
  const getTipoLabel = (tipo: number | null): string => {
    switch (tipo) {
      case 1:
        return "Despesa";
      case 2:
        return "Receita";
      default:
        return "Selecione uma categoria";
    }
  };

  // ✅ FUNÇÃO AUXILIAR: Obter cor do badge baseado no tipo
  const getTipoBadgeColor = (tipo: number | null) => {
    switch (tipo) {
      case 1:
        return "bg-red-50 border-red-300 text-red-700";
      case 2:
        return "bg-green-50 border-green-300 text-green-700";
      default:
        return "bg-gray-50 border-gray-300 text-gray-600";
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSucesso(null);
    setErro(null);

    // Validações
    if (!descricao.trim()) {
      setErro("Descrição é obrigatória");
      return;
    }

    if (descricao.trim().length < 3) {
      setErro("Descrição deve ter no mínimo 3 caracteres");
      return;
    }

    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      setErro("Valor deve ser um número maior que zero");
      return;
    }

    if (!categoriaId) {
      setErro("Selecione uma categoria");
      return;
    }

    if (!pessoaId) {
      setErro("Selecione uma pessoa");
      return;
    }

    setLoading(true);

    try {
      // ✅ Converter strings para números ao enviar
      const pessoaIdNum = parseInt(pessoaId, 10);
      const categoriaIdNum = parseInt(categoriaId, 10);

      if (isNaN(pessoaIdNum) || isNaN(categoriaIdNum)) {
        setErro("Erro ao processar pessoa ou categoria");
        setLoading(false);
        return;
      }

      // ✅ Obter o tipo da categoria
      const categoriaTipo = getCategoriaTipo();
      if (categoriaTipo === null) {
        setErro("Erro ao processar tipo da categoria");
        setLoading(false);
        return;
      }

      const payload = {
        descricao: descricao.trim(),
        valor: valorNum,
        pessoaId: pessoaIdNum,
        categoriaId: categoriaIdNum,
        tipo: categoriaTipo, // ✅ 1 = Despesa, 2 = Receita
      };


      if (isEditing) {
        await updateTransacao(Number(id), payload);
        setSucesso("Transação atualizada com sucesso!");
      } else {
        await createTransacao(payload);
        setSucesso("Transação criada com sucesso!");
      }

      setTimeout(() => {
        navigate("/transacoes");
      }, 1500);
    } catch (error: unknown) {
     

      if (axios.isAxiosError(error)) {
       
        const mensagem =
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.errors?.[0] ||
          "Erro ao salvar transação";
        setErro(`Erro: ${mensagem}`);
      } else if (error instanceof Error) {
        setErro(`Erro: ${error.message}`);
      } else {
        setErro("Erro inesperado ao salvar transação");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const categoriaTipo = getCategoriaTipo();
  const tipoLabel = getTipoLabel(categoriaTipo);
  const tipoColor = getTipoBadgeColor(categoriaTipo);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          {isEditing ? "Editar Transação" : "Nova Transação"}
        </h1>

        {erro && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-medium">{erro}</p>
          </div>
        )}

        {sucesso && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-medium">{sucesso}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição *
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Pagamento de aluguel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Valor (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ✅ Mostrar o tipo da transação */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Transação
            </label>
            <div
              className={`w-full px-4 py-2 border-2 rounded-lg font-semibold text-center ${tipoColor}`}
            >
              {tipoLabel}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ℹ️ Determinado automaticamente pela categoria selecionada
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              value={categoriaId}
              onChange={(e) => {
               
                setCategoriaId(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option key="empty-categoria" value="">
                Selecione uma categoria
              </option>
              {categorias && categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <option key={`categoria-${categoria.id}`} value={String(categoria.id)}>
                    {categoria.descricao} ({finalidadeToLabel(categoria.finalidade)})
                  </option>
                ))
              ) : (
                <option key="no-categorias" disabled>
                  Nenhuma categoria disponível
                </option>
              )}
            </select>
            {categorias.length === 0 && (
              <p className="text-sm text-yellow-600 mt-2">
                ⚠️ Nenhuma categoria carregada. Recarregue a página.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pessoa *
            </label>
            <select
              value={pessoaId}
              onChange={(e) => {
               
                setPessoaId(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option key="empty-pessoa" value="">
                Selecione uma pessoa
              </option>
              {pessoas && pessoas.length > 0 ? (
                pessoas.map((pessoa) => (
                  <option key={`pessoa-${pessoa.id}`} value={String(pessoa.id)}>
                    {pessoa.nome}
                  </option>
                ))
              ) : (
                <option key="no-pessoas" disabled>
                  Nenhuma pessoa disponível
                </option>
              )}
            </select>
            {pessoas.length === 0 && (
              <p className="text-sm text-yellow-600 mt-2">
                ⚠️ Nenhuma pessoa carregada. Recarregue a página.
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Salvando..." : "Salvar Transação"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/transacoes")}
              disabled={loading}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition disabled:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}