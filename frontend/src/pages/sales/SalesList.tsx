import { PageTitle } from "@/components/ui/page-title";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface Sale {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  amount: number;
  items: number;
  status: string;
  paymentMethod: string;
}

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/sale/sales"
        );
        setSales(response.data);
      } catch (err) {
        setError("Failed to fetch sales data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const columns = [
    { key: "invoiceNumber", title: "Invoice #" },
    { key: "customer", title: "Customer" },
    { key: "date", title: "Date" },
    {
      key: "amount",
      title: "Amount",
      render: (row: Sale) => (
        <div className="font-medium">${row.amount.toFixed(2)}</div>
      ),
    },
    {
      key: "items",
      title: "Items",
      render: (row: Sale) => <Badge variant="outline">{row.items}</Badge>,
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (row: Sale) => (
        <div className="font-medium">{row.paymentMethod}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row: Sale) => (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: Sale) => (
        <div className="flex space-x-2">
          <Link to={`/sales/${row.id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/sales/${row.id}/invoice`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <FileText className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Sales Management"
        description="View and manage all pharmacy sales and transactions."
      >
        <Link to="/dashboard/sales/new">
          <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
            <Plus className="mr-1 h-4 w-4" /> New Sale
          </Button>
        </Link>
      </PageTitle>

      {loading && <div>Loading sales data...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <DataTable columns={columns} data={sales} keyField="id" />
      )}
    </div>
  );
}
