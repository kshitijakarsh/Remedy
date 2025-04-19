import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

// Import Pages
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
import Signup from "@/pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />

            {/* Medicine Routes */}
            <Route path="medicine">
              <Route index element={<MedicineList />} />
              <Route path="new" element={<MedicineForm />} />
              <Route path=":id/edit" element={<MedicineForm />} />
            </Route>

            {/* Sales Routes */}
            <Route path="sales">
              <Route index element={<SalesList />} />
              <Route path="new" element={<NewSale />} />
              <Route path=":id/invoice" element={<SaleInvoice />} />
            </Route>

            {/* Customer Routes */}
            <Route path="customers" element={<CustomersList />} />

            {/* Supplier Routes */}
            <Route path="suppliers" element={<SuppliersList />} />

            {/* Reports Routes */}
            <Route path="reports" element={<ReportsAnalytics />} />
          </Route>

          {/* Catch-all for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
