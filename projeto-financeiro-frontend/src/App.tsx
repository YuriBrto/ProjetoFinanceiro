import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import PessoaList from "./pages/pessoas/PessoaList";
import PessoaForm from "./pages/pessoas/PessoaForm";
import CategoriaList from "./pages/categorias/CategoriaList";
import CategoriaForm from "./pages/categorias/CategoriaForm";
import TransacaoForm from "./pages/transacao/TransacaoForm";
import TransacaoList from "./pages/transacao/Transacoes";
import Relatorios from "./pages/Relatorio/Relatorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Layout envolvendo todas as rotas protegidas */}
        <Route path="/" element={<Layout />}>
          {/* Dashboard - Home */}
          <Route index element={<Dashboard />} />

          {/* ========== PESSOAS ========== */}
          <Route path="pessoas" element={<PessoaList />} />
          <Route path="pessoas/nova" element={<PessoaForm />} />
          {/* ✅ ALTERADO: /pessoas/:id em vez de /pessoas/editar/:id */}
          <Route path="pessoas/:id" element={<PessoaForm />} />

          {/* ========== CATEGORIAS ========== */}
          <Route path="categorias" element={<CategoriaList />} />
          <Route path="categorias/nova" element={<CategoriaForm />} />
          {/* ✅ ALTERADO: /categorias/:id em vez de /categorias/editar/:id */}
          <Route path="categorias/:id" element={<CategoriaForm />} />

          {/* ========== TRANSAÇÕES ========== */}
          <Route path="transacoes" element={<TransacaoList />} />
          <Route path="transacoes/nova" element={<TransacaoForm />} />
          {/* ✅ ALTERADO: /transacoes/:id em vez de /transacoes/editar/:id */}
          <Route path="transacoes/:id" element={<TransacaoForm />} />

          {/* ========== RELATÓRIOS ========== */}
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;