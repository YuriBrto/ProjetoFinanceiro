import React, { useEffect, useState } from "react";
import { getAllCategorias } from "../../api/categoria.api";
import type { CategoriaDTO } from "../../models/categoria";

const CategoriaList: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getAllCategorias();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.Id}>
            {categoria.descricao} - {categoria.finalidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaList;
