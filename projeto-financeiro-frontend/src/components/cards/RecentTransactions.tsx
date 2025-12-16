export function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-4">Transações Recentes</h3>

      <ul className="space-y-3">
        <li className="flex justify-between">
          <span>Aluguel - Maria</span>
          <span className="text-red-500">- R$ 1.200</span>
        </li>
        <li className="flex justify-between">
          <span>Salário - Empresa</span>
          <span className="text-green-600">+ R$ 5.000</span>
        </li>
      </ul>
    </div>
  );
}
