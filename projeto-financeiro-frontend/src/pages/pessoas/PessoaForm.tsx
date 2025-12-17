import React, { useState, useEffect,useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPessoa,
  updatePessoa,
  getPessoaById,
} from "../../api/pessoa.api";
import type { PessoaCreateDTO, PessoaUpdateDTO } from "../../models/pessoa";
import Button from "../../components/UI/Button";
import Input from "../../components/Input";
import { ArrowLeft, Save, User } from "lucide-react";
import axios from "axios";


const PessoaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [errors, setErrors] = useState<{ nome?: string; idade?: string }>({});

  const loadPessoa = useCallback(async (pessoaId: number) => {
  try {
    const pessoa = await getPessoaById(pessoaId);
    setNome(pessoa.nome);
    setIdade(pessoa.idade);
  } catch (error) {
    console.error("Erro ao carregar pessoa", error);
    alert("Erro ao carregar pessoa");
    navigate("/pessoas");
  }
}, [navigate]);

  useEffect(() => {
    if (id) {
      loadPessoa(Number(id));
    }
  }, [id, navigate]);

  const validate = (): boolean => {
    const newErrors: { nome?: string; idade?: string } = {};

    if (!nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (nome.length < 3) {
      newErrors.nome = "Nome deve ter no mínimo 3 caracteres";
    }

    if (idade < 0) {
      newErrors.idade = "Idade não pode ser negativa";
    } else if (idade > 150) {
      newErrors.idade = "Idade inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

   try {
  if (id) {
    const dto: PessoaUpdateDTO = {
      Id: Number(id),
      nome: nome.trim(),
      idade,
    };
    await updatePessoa(Number(id), dto);
    alert("Pessoa atualizada com sucesso!");
  } else {
    const dto: PessoaCreateDTO = {
      nome: nome.trim(),
      idade,
    };
    await createPessoa(dto);
    alert("Pessoa cadastrada com sucesso!");
  }

  navigate("/pessoas");
} catch (error: unknown) {
  console.error("Erro ao salvar pessoa", error);

  if (axios.isAxiosError(error)) {
    alert(error.response?.data?.message || "Erro ao salvar pessoa");
  } else if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Erro inesperado ao salvar pessoa");
  }
} finally {
  setLoading(false);
}
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/pessoas")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? "Editar Pessoa" : "Nova Pessoa"}
        </h1>
        <p className="text-gray-600 mt-1">
          {id
            ? "Atualize as informações da pessoa"
            : "Preencha os dados para cadastrar uma nova pessoa"}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center">
              {nome ? (
                <span className="text-indigo-600 font-bold text-4xl">
                  {nome.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-12 h-12 text-indigo-400" />
              )}
            </div>
          </div>

          {/* Nome */}
          <Input
            label="Nome Completo"
            type="text"
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            error={errors.nome}
            placeholder="Digite o nome completo"
            required
          />

          {/* Idade */}
          <Input
            label="Idade"
            type="number"
            value={idade}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdade(Number(e.target.value))}
            error={errors.idade}
            placeholder="Digite a idade"
            min={0}
            max={150}
            required
          />

          {/* Info Card */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-indigo-700">
                  As pessoas cadastradas podem ser vinculadas a transações
                  financeiras. Certifique-se de preencher todos os dados
                  corretamente.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="flex-1"
            >
              <Save className="w-5 h-5 mr-2" />
              {id ? "Atualizar Pessoa" : "Cadastrar Pessoa"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/pessoas")}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Card */}
      {nome && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="text-sm font-medium text-indigo-100 mb-3">
            Preview do Cadastro
          </h3>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {nome.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold">{nome}</p>
              <p className="text-indigo-100">{idade} anos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PessoaForm;