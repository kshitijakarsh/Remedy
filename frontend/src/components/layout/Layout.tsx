
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="text-center text-sm text-gray-500">
            © 2025 Remedy Pharmacy Management System. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
