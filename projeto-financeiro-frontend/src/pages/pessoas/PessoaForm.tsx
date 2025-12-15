import React, { useState } from "react";
import { createPessoa, updatePessoa } from "../../api/pessoa.api";
import type {
  PessoaCreateDTO,
  PessoaUpdateDTO,
} from "../../models/pessoa";

interface PessoaFormProps {
  id?: number;
  initialNome?: string;
  initialIdade?: number;
}

const PessoaForm: React.FC<PessoaFormProps> = ({
  id,
  initialNome = "",
  initialIdade = 0,
}) => {
  const [nome, setNome] = useState<string>(initialNome);
  const [idade, setIdade] = useState<number>(initialIdade);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        const dto: PessoaUpdateDTO = {
          Id: id,
          nome,
          idade,
        };
        await updatePessoa(id, dto);
      } else {
        const dto: PessoaCreateDTO = {
          nome,
          idade,
        };
        await createPessoa(dto);
      }

      setNome("");
      setIdade(0);
      alert("Pessoa salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar pessoa", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Editar Pessoa" : "Nova Pessoa"}</h2>

      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Idade</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(Number(e.target.value))}
          min={0}
          required
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default PessoaForm;
