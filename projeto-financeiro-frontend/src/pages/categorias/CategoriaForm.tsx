import React, { useState } from "react";
import { createCategoria, updateCategoria } from "../../api/categoria.api";
import type { CategoriaCreateDTO, CategoriaUpdateDTO } from "../../models/categoria";
import { FinalidadeCategoria } from "../../models/categoria";

const CategoriaForm: React.FC<{ id?: number }> = ({ id }) => {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(
    FinalidadeCategoria.DESPESA
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      const dto: CategoriaUpdateDTO = {
        Id: id,
        descricao,
        finalidade,
      };
      await updateCategoria(id, dto);
    } else {
      const dto: CategoriaCreateDTO = {
        descricao,
        finalidade,
      };
      await createCategoria(dto);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Descrição</label>
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <label>Finalidade</label>
      <select
        value={finalidade}
        onChange={(e) =>
          setFinalidade(e.target.value as FinalidadeCategoria)
        }
      >
        <option value={FinalidadeCategoria.RECEITA}>Receita</option>
        <option value={FinalidadeCategoria.DESPESA}>Despesa</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default CategoriaForm;
