import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Bem-vindo</p>
          <h1 className="text-xl font-semibold text-gray-800">
            Finance App
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
          <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
