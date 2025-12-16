import { Plus, UserPlus, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Nova Transação", icon: Plus, path: "/transacoes/nova" },
    { label: "Cadastrar Pessoa", icon: UserPlus, path: "/pessoas/nova" },
    { label: "Cadastrar Categoria", icon: Tag, path: "/categorias/nova" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {actions.map(({ label, icon: Icon, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className="bg-white rounded-xl p-4 shadow hover:shadow-md transition flex flex-col items-center"
        >
          <Icon className="text-indigo-600 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
