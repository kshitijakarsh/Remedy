import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-gray-100 bg-white px-6 py-4 shadow-inner">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-gray-500">
                © 2025 Remedy Pharmacy Management System. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 mt-2 md:mt-0 text-xs">
                <a
                  href="/privacy"
                  className="text-pharmacy-primary hover:text-pharmacy-secondary transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-pharmacy-primary hover:text-pharmacy-secondary transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="/contact"
                  className="text-pharmacy-primary hover:text-pharmacy-secondary transition-colors duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
