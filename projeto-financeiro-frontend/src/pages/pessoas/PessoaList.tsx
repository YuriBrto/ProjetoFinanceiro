import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPessoas, deletePessoa } from "../../api/pessoa.api";
import type { PessoaResponseDTO } from "../../models/pessoa";
import { Plus, Trash2, Pencil } from "lucide-react";

const PessoaList: React.FC = () => {
  const navigate = useNavigate();
  const [pessoas, setPessoas] = useState<PessoaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Carregar pessoas ao montar
  useEffect(() => {
    const loadPessoas = async () => {
      try {
        const data = await getAllPessoas();
        setPessoas(data);
      } catch (error) {
        console.error("❌ Erro ao carregar pessoas", error);
      } finally {
        setLoading(false);
      }
    };

    loadPessoas();
  }, []);

  // ✅ Deletar pessoa
  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja excluir esta pessoa?")) return;

    try {
      await deletePessoa(id);
      setPessoas((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("❌ Erro ao excluir pessoa", error);
      alert("Erro ao excluir pessoa");
    }
  };

  // ✅ Editar pessoa
  const handleEdit = (id: number) => {
    navigate(`/pessoas/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Carregando pessoas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Pessoas</h2>

        <Link
          to="/pessoas/nova"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Nova Pessoa
        </Link>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Nome
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Idade
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pessoas.length > 0 ? (
              pessoas.map((pessoa) => (
                <tr key={pessoa.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {pessoa.nome}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{pessoa.idade} anos</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {/* ✅ Botão Editar - chama navigate diretamente */}
                    <button
                      onClick={() => handleEdit(pessoa.id)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      <Pencil size={16} />
                      Editar
                    </button>

                    {/* ✅ Botão Excluir */}
                    <button
                      onClick={() => handleDelete(pessoa.id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
                    >
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-500 font-medium"
                >
                  Nenhuma pessoa cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rodapé com total */}
      <div className="text-center text-sm text-gray-500">
        <p>Total de pessoas cadastradas: <strong>{pessoas.length}</strong></p>
      </div>
    </div>
  );
};

export default PessoaList;