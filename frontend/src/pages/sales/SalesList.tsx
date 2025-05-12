import { PageTitle } from "@/components/ui/page-title";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface Sale {
  _id: string;
  customerId: string;
  paymentMethod: string;
  items: {
    medicineId: string;
    medicineName: string;
    quantity: number;
    price: number;
    total: number;
    _id: string;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Customer {
  _id: string;
  name: string;
  // Add any other fields your customer object has if needed
}

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSalesAndCustomers = async () => {
      setLoading(true);
      try {
        const [salesRes, customersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/sale/sales"),
          axios.get("http://localhost:3000/api/customers/")
        ]);

        setSales(salesRes.data);
        setCustomers(customersRes.data);
      } catch (err) {
        setError("Failed to fetch sales or customer data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesAndCustomers();
  }, []);

  const getCustomerName = (id: string) => {
    const customer = customers.find((c) => c._id === id);
    return customer ? customer.name : "Unknown Customer";
  };

  const columns = [
    {
      key: "invoiceNumber",
      title: "Invoice #",
      render: (row: Sale) => (
        <div className="font-poppins">{row._id}</div>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      render: (row: Sale) => (
        <div className="font-poppins">{getCustomerName(row.customerId)}</div>
      ),
    },
    {
      key: "date",
      title: "Date",
      render: (row: Sale) => (
        <div className="font-poppins">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (row: Sale) => {
        const amount = row.total ?? 0;
        return <div className="font-poppins">${amount.toFixed(2)}</div>;
      },
    },
    {
      key: "items",
      title: "Items",
      render: (row: Sale) => (
        <div>
          {row.items.map((item) => (
            <div key={item._id}>
              <div>
                <strong>{item.medicineName}</strong> - {item.quantity} x $
                {item.price} = ${item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (row: Sale) => (
        <div className="font-poppins">{row.paymentMethod}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row: Sale) => (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Paid
        </Badge>
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
        <DataTable columns={columns} data={sales} keyField="_id" />
      )}
    </div>
  );
}
