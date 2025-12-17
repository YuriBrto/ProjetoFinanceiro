import React, { useEffect, useState } from "react";
import { getAllCategorias, deleteCategoria } from "../../api/categoria.api";
import { setCategoriaCache } from "../../api/categoria.cache";
import { FinalidadeCategoria, finalidadeToLabel } from "../../models/categoria";
import type { CategoriaDTOProcessed } from "../../models/categoria";
import { useNavigate } from "react-router-dom";

const CategoriaList: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaDTOProcessed[]>([]);
  const navigate = useNavigate();

  // ✅ CORRIGIDO: Mover a função para dentro do useEffect
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getAllCategorias();
        setCategorias(data);
        // ✅ Popular o cache quando carregar
        setCategoriaCache(data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    };

    loadCategorias();
  }, []); // ✅ Array vazio - executa uma única vez ao montar

  const handleDelete = async (id: number) => {
    if (!window.confirm("Excluir categoria?")) return;
    try {
      await deleteCategoria(id);
      const novasCategorias = categorias.filter((c) => c.id !== id);
      setCategorias(novasCategorias);
      // ✅ Atualizar cache após deletar
      setCategoriaCache(novasCategorias);
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  };

  const getFinalidadeColor = (finalidade: FinalidadeCategoria) => {
    switch (finalidade) {
      case FinalidadeCategoria.Receita:
        return "bg-green-100 text-green-800";
      case FinalidadeCategoria.Despesa:
        return "bg-red-100 text-red-800";
      case FinalidadeCategoria.Ambas:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <button
          onClick={() => navigate("/categorias/nova")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left font-semibold text-gray-700">Descrição</th>
              <th className="p-4 text-center font-semibold text-gray-700">Finalidade</th>
              <th className="p-4 text-right font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{c.descricao}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getFinalidadeColor(
                      c.finalidade
                    )}`}
                  >
                    {finalidadeToLabel(c.finalidade)}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => navigate(`/categorias/${c.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categorias.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
            <p className="text-sm">Crie uma nova categoria para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriaList;