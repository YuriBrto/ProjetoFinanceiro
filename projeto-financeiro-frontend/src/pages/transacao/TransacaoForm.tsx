import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTransacao,
  updateTransacao,
  getTransacaoById,
} from "../../api/transacao.api";
import type {
  TransacaoCreateDTO,
  TransacaoUpdateDTO,
  TransacaoResponseDTO,
  TipoTransacao,
} from "../../models/transacao";

const TransacaoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState<TipoTransacao>(1);
  const [categoriaId, setCategoriaId] = useState(0);
  const [pessoaId, setPessoaId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const t: TransacaoResponseDTO = await getTransacaoById(Number(id));
      setDescricao(t.Descricao);
      setValor(t.Valor);
      setTipo(t.Tipo);
      setCategoriaId(t.CategoriaId);
      setPessoaId(t.PessoaId);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        const dto: TransacaoUpdateDTO = {
          Id: Number(id),
          Descricao: descricao,
          Valor: valor,
          Tipo: tipo,
          CategoriaId: categoriaId,
          PessoaId: pessoaId,
        };
        await updateTransacao(Number(id), dto);
      } else {
        const dto: TransacaoCreateDTO = {
          Descricao: descricao,
          Valor: valor,
          Tipo: tipo,
          CategoriaId: categoriaId,
          PessoaId: pessoaId,
        };
        await createTransacao(dto);
      }
      navigate("/transacoes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Editar Transação" : "Nova Transação"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Tipo (1=Despesa, 2=Receita)"
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="CategoriaId"
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="PessoaId"
          value={pessoaId}
          onChange={(e) => setPessoaId(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default TransacaoForm;
