import { Home, Users, Repeat, BarChart3, Tags } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
  const linkClass =
    "flex flex-col items-center text-sm text-gray-600 hover:text-indigo-600";

  return (
    <nav className="bg-white border-t fixed bottom-0 w-full md:hidden">
      <div className="flex justify-around py-2">
        <NavLink to="/" className={linkClass}>
          <Home />
          Início
        </NavLink>

        <NavLink to="/pessoas" className={linkClass}>
          <Users />
          Pessoas
        </NavLink>

        <NavLink to="/transacoes" className={linkClass}>
          <Repeat />
          Transações
        </NavLink>

        <NavLink to="/relatorios" className={linkClass}>
          <BarChart3 />
          Relatórios
        </NavLink>

        <NavLink to="/categorias" className={linkClass}>
          <Tags />
          Categorias
        </NavLink>
      </div>
    </nav>
  );
}
