import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Dashboard from "../pages/dashboard/Dashboard";

import CategoriaList from "../pages/categorias/CategoriaList";
import CategoriaForm from "../pages/categorias/CategoriaForm";

import PessoaList from "../pages/pessoas/PessoaList";
import PessoaForm from "../pages/pessoas/PessoaForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout principal */}
      <Route element={<Layout />}>
        {/* Home */}
        <Route path="/" element={<Dashboard />} />

        {/* Categorias */}
        <Route path="/categorias" element={<CategoriaList />} />
        <Route path="/categorias/nova" element={<CategoriaForm />} />
        <Route path="/categorias/:id" element={<CategoriaForm />} />

        {/* Pessoas */}
        <Route path="/pessoas" element={<PessoaList />} />
        <Route path="/pessoas/nova" element={<PessoaForm />} />
        <Route path="/pessoas/:id" element={<PessoaForm />} />

        {/* Futuro */}
        {/* <Route path="/transacoes" element={<TransacaoList />} /> */}
        {/* <Route path="/relatorios" element={<Relatorios />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
