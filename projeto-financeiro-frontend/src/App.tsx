import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import PessoaList from "./pages/pessoas/PessoaList";
import PessoaForm from "./pages/pessoas/PessoaForm";
import CategoriaList from "./pages/categorias/CategoriaList";
import CategoriaForm from "./pages/categorias/CategoriaForm";
import TransacaoForm from "./pages/transacao/TransacaoForm";
import TransacaoList from "./pages/transacao/Transacoes"
import Relatorios from "./pages/Relatorio/Relatorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Pessoas */}
          <Route path="pessoas" element={<PessoaList />} />
          <Route path="pessoas/nova" element={<PessoaForm />} />
          <Route path="pessoas/editar/:id" element={<PessoaForm />} />

          {/* Categorias */}
          <Route path="categorias" element={<CategoriaList />} />
          <Route path="categorias/nova" element={<CategoriaForm />} />
          <Route path="categorias/editar/:id" element={<CategoriaForm />} />

          {/* Transações */}
          <Route path="transacoes" element={<TransacaoList />} />
          <Route path="transacoes/nova" element={<TransacaoForm />} />
          <Route path="transacoes/editar/:id" element={<TransacaoForm />} />

          {/* Relatórios */}
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;