import { useEffect, useState } from "react";
import { relatorioService } from "../../api/relatorio.api";
import type { TransacaoRecenteDTO } from "../../api/relatorio.api";

export default function Dashboard() {
  const [saldoGeral, setSaldoGeral] = useState<number>(0);
  const [transacoes, setTransacoes] = useState<TransacaoRecenteDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [saldo, recentes] = await Promise.all([
          relatorioService.obterSaldoGeral(),
          relatorioService.obterTransacoesRecentes(),
        ]);

        setSaldoGeral(saldo);
        setTransacoes(recentes);
      } catch (error) {
        console.error("Erro ao carregar dashboard", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Carregando dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Saldo Geral */}
      <div className="bg-white rounded-xl p-6 shadow">
        <p className="text-sm text-gray-500">Saldo Geral</p>
        <h2 className="text-3xl font-bold text-[#3A67B8]">
          R$ {saldoGeral.toFixed(2)}
        </h2>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-[#3A67B8] text-white rounded-xl py-4">
          Nova Transação
        </button>
        <button className="bg-white border rounded-xl py-4">
          Pessoa
        </button>
        <button className="bg-white border rounded-xl py-4">
          Categoria
        </button>
      </div>

      {/* Transações recentes */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-4">Transações Recentes</h3>

        {transacoes.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Nenhuma transação encontrada.
          </p>
        ) : (
          <ul className="space-y-3">
            {transacoes.map((t, index) => (
              <li key={index} className="flex justify-between">
                <span>
                  {t.descricao} ({t.pessoaNome})
                </span>
                <span
                  className={
                    t.tipo === "Receita"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {t.tipo === "Receita" ? "+" : "-"} R${" "}
                  {t.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
