import { Outlet } from "react-router-dom";
import Header from "./Header";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden lg:flex">
        <Sidebar />
      </aside>

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header (Mobile / Tablet) */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b">
          <Header />
        </header>

        {/* Conteúdo */}
        <main className="flex-1 w-full px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Bottom Navigation (Mobile) */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t">
          <BottomNav />
        </nav>
      </div>
    </div>
  );
}
