import React, { useEffect, useState } from "react";
import { getAllCategorias, deleteCategoria } from "../../api/categoria.api";
import { FinalidadeCategoria } from "../../models/categoria";
import type {
  
  CategoriaDTO
} from "../../models/categoria";

import { useNavigate } from "react-router-dom";

const CategoriaList: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategorias().then(setCategorias);
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Excluir categoria?")) return;
    await deleteCategoria(id);
    setCategorias((prev) => prev.filter((c) => c.Id !== id));
  };

  const labelFinalidade = (f: FinalidadeCategoria) =>
    f === FinalidadeCategoria.Receita ? "Receita" : "Despesa";

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <button
          onClick={() => navigate("/categorias/nova")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Descrição</th>
              <th className="p-4">Finalidade</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.Id} className="border-b">
                <td className="p-4">{c.descricao}</td>
                <td className="p-4">{labelFinalidade(c.finalidade)}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => navigate(`/categorias/${c.Id}`)}
                    className="text-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.Id)}
                    className="text-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriaList;
