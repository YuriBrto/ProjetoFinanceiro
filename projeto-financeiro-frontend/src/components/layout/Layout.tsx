import { Outlet } from "react-router-dom";
import Header from "./Header";
import { BottomNav } from "./BottomNav";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Header */}
      <Header />

      {/* Conteúdo das páginas */}
      <main className="flex-1 px-4 py-4 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom navigation (mobile) */}
      <BottomNav />
    </div>
  );
}
