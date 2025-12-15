import React, { useEffect, useState } from "react";
import { getAllPessoas, deletePessoa } from "../../api/pessoa.api";
import type { PessoaResponseDTO } from "../../models/pessoa";

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Pessoas</h2>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.Id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td>
                {/* depois ligamos com rota */}
                <button onClick={() => handleDelete(pessoa.Id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PessoaList;
