import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategoria,
  updateCategoria,
  getCategoriaById,
} from "../../api/categoria.api";
import { FinalidadeCategoria } from "../../models/categoria";
import type {
  CategoriaCreateDTO,
  CategoriaUpdateDTO,
} from "../../models/categoria";

import Button from "../../components/UI/Button";
import Input from "../../components/Input";
import { ArrowLeft, Save, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";

const CategoriaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  // ✅ Estado agora é sempre número
  const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(
    FinalidadeCategoria.Despesa
  );
  const [errors, setErrors] = useState<{ descricao?: string }>({});

  const loadCategoria = useCallback(
    async (categoriaId: number) => {
      try {
        const categoria = await getCategoriaById(categoriaId);
        setDescricao(categoria.descricao);
        // ✅ Sempre recebe número (já processado)
        setFinalidade(categoria.finalidade);
      } catch {
        alert("Erro ao carregar categoria");
        navigate("/categorias");
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (id) loadCategoria(Number(id));
  }, [id, loadCategoria]);

  const validate = () => {
    const newErrors: { descricao?: string } = {};
    if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      if (id) {
        const dto: CategoriaUpdateDTO = {
          id: Number(id),
          descricao: descricao.trim(),
          finalidade, // ✅ Sempre número
        };
        await updateCategoria(Number(id), dto);
        alert("Categoria atualizada com sucesso");
      } else {
        const dto: CategoriaCreateDTO = {
          descricao: descricao.trim(),
          finalidade, // ✅ Sempre número
        };
        await createCategoria(dto);
        alert("Categoria criada com sucesso");
      }

      navigate("/categorias");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Erro ao salvar");
      } else {
        alert("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={() => navigate("/categorias")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </Button>

      <h1 className="text-2xl font-bold">
        {id ? "Editar Categoria" : "Nova Categoria"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
        <Input
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={errors.descricao}
          required
        />

        <div className="grid grid-cols-3 gap-4">
          {/* Despesa = 1 */}
          <button
            type="button"
            onClick={() => setFinalidade(FinalidadeCategoria.Despesa)}
            className={`p-4 rounded-xl border-2 transition ${
              finalidade === FinalidadeCategoria.Despesa
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <TrendingDown className="mx-auto mb-2 text-red-600" />
            <p className="font-semibold text-gray-900">Despesa</p>
          </button>

          {/* Receita = 2 */}
          <button
            type="button"
            onClick={() => setFinalidade(FinalidadeCategoria.Receita)}
            className={`p-4 rounded-xl border-2 transition ${
              finalidade === FinalidadeCategoria.Receita
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <TrendingUp className="mx-auto mb-2 text-green-600" />
            <p className="font-semibold text-gray-900">Receita</p>
          </button>

          {/* Ambas = 3 */}
          <button
            type="button"
            onClick={() => setFinalidade(FinalidadeCategoria.Ambas)}
            className={`p-4 rounded-xl border-2 transition ${
              finalidade === FinalidadeCategoria.Ambas
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mx-auto mb-2 flex justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <TrendingDown className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-semibold text-gray-900 text-sm">Ambas</p>
          </button>
        </div>

        <Button type="submit" isLoading={loading} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default CategoriaForm;