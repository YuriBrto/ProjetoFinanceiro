import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function BalanceCard() {
  const [show, setShow] = useState(true);

  return (
    <div className="bg-[#3A67B8] text-white rounded-2xl p-6 shadow-md">
      <p className="text-sm opacity-80">Saldo Geral</p>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-4xl font-bold">
          {show ? "R$ 12.450,90" : "••••••"}
        </h2>

        <button onClick={() => setShow(!show)}>
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
}
