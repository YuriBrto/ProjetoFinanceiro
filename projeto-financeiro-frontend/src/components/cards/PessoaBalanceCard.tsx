export function PessoaBalanceCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-4">Visão Rápida por Pessoa</h3>

      <ul className="space-y-3">
        {["Maria", "João", "Empresa"].map((pessoa) => (
          <li key={pessoa} className="flex justify-between">
            <span>{pessoa}</span>
            <span className="text-green-600 font-medium">
              R$ 2.300,00
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
