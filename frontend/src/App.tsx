import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Login from "@/pages/auth/Login";
import Home from "@/pages/Home";

import Dashboard from "@/pages/Dashboard";
import MedicineList from "@/pages/medicine/MedicineList";
import MedicineForm from "@/pages/medicine/MedicineForm";
import SalesList from "@/pages/sales/SalesList";
import NewSale from "@/pages/sales/NewSale";
import SaleInvoice from "@/pages/sales/SaleInvoice";
import CustomersList from "@/pages/customers/CustomersList";
import SuppliersList from "@/pages/suppliers/SuppliersList";
import ReportsAnalytics from "@/pages/reports/ReportsAnalytics";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/auth/Signup";
import NewCustomer from "./pages/customers/NewCustomer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />

            <Route path="medicine">
              <Route index element={<MedicineList />} />
              <Route path="new" element={<MedicineForm />} />
              <Route path=":id/edit" element={<MedicineForm />} />
            </Route>

            <Route path="sales">
              <Route index element={<SalesList />} />
              <Route path="new" element={<NewSale />} />
              <Route path=":id/invoice" element={<SaleInvoice />} />
            </Route>

            <Route path="customers">
              <Route index element={<CustomersList />} />
              <Route path="new" element={<NewCustomer />} />
            </Route>

            <Route path="suppliers" element={<SuppliersList />} />

            <Route path="reports" element={<ReportsAnalytics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
