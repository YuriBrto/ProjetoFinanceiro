import { Home, Users, Repeat, BarChart3, Tags, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard", description: "Visão geral" },
    { to: "/pessoas", icon: Users, label: "Pessoas", description: "Gerenciar pessoas" },
    { to: "/categorias", icon: Tags, label: "Categorias", description: "Tipos de transação" },
    { to: "/transacoes", icon: Repeat, label: "Transações", description: "Todas as operações" },
    { to: "/relatorios", icon: BarChart3, label: "Relatórios", description: "Análise detalhada" },
  ];

  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 h-screen flex-col sticky top-0 shadow-sm">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
            <Wallet className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Finance App</h1>
            <p className="text-xs text-gray-500">Gestão Financeira</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, description }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"}`}>
                  <Icon 
                    size={22} 
                    className={isActive ? "text-white" : "text-gray-600"} 
                  />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isActive ? "text-white" : "text-gray-900"}`}>
                    {label}
                  </p>
                  <p className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
                    {description}
                  </p>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-indigo-900 mb-1">
            Sistema Financeiro
          </p>
          <p className="text-xs text-gray-600">
            v1.0.0 - 2025
          </p>
        </div>
      </div>
    </aside>
  );
}