import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPessoas, deletePessoa } from "../../api/pessoa.api";
import type { PessoaResponseDTO } from "../../models/pessoa";
import { Plus, Trash2, Pencil } from "lucide-react";

const PessoaList: React.FC = () => {
  const [pessoas, setPessoas] = useState<PessoaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPessoas = async () => {
    try {
      const data = await getAllPessoas();
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao carregar pessoas", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja excluir esta pessoa?")) return;

    try {
      await deletePessoa(id);
      setPessoas((prev) => prev.filter((p) => p.Id !== id));
    } catch (error) {
      console.error("Erro ao excluir pessoa", error);
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Carregando pessoas...</p>
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
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
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
              <th className="px-6 py-4 text-left">Nome</th>
              <th className="px-6 py-4 text-left">Idade</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pessoas.length > 0 ? (
              pessoas.map((pessoa) => (
                <tr key={pessoa.Id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{pessoa.nome}</td>
                  <td className="px-6 py-4">{pessoa.idade}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/pessoas/${pessoa.Id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(pessoa.Id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  Nenhuma pessoa cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PessoaList;
