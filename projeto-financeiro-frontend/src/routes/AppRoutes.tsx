import { Routes, Route, Navigate } from "react-router-dom";

import CategoriaList from "../pages/categorias/CategoriaList";
import CategoriaForm from "../pages/categorias/CategoriaForm";

import PessoaList from "../pages/pessoas/PessoaList";
import PessoaForm from "../pages/pessoas/PessoaForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Navigate to="/categorias" />} />

      {/* Categorias */}
      <Route path="/categorias" element={<CategoriaList />} />
      <Route path="/categorias/nova" element={<CategoriaForm />} />
      <Route path="/categorias/:id" element={<CategoriaForm />} />

      {/* Pessoas */}
      <Route path="/pessoas" element={<PessoaList />} />
      <Route path="/pessoas/nova" element={<PessoaForm />} />
      <Route path="/pessoas/:id" element={<PessoaForm />} />
    </Routes>
  );
};

export default AppRoutes;
