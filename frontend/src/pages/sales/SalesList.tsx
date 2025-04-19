
import { PageTitle } from "@/components/ui/page-title";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Sample sales data
const sales = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    customer: "John Doe",
    date: "2025-04-15",
    amount: 159.99,
    items: 3,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    customer: "Jane Smith",
    date: "2025-04-14",
    amount: 95.50,
    items: 2,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    customer: "Bob Johnson",
    date: "2025-04-13",
    amount: 245.75,
    items: 5,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    customer: "Alice Williams",
    date: "2025-04-12",
    amount: 76.25,
    items: 1,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    customer: "Charlie Brown",
    date: "2025-04-11",
    amount: 120.00,
    items: 2,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "6",
    invoiceNumber: "INV-2025-006",
    customer: "Diana Prince",
    date: "2025-04-10",
    amount: 320.15,
    items: 4,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "7",
    invoiceNumber: "INV-2025-007",
    customer: "Edward Norton",
    date: "2025-04-09",
    amount: 45.99,
    items: 1,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "8",
    invoiceNumber: "INV-2025-008",
    customer: "Fiona Adams",
    date: "2025-04-08",
    amount: 189.50,
    items: 3,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
];

export default function SalesList() {
  const columns = [
    { key: "invoiceNumber", title: "Invoice #" },
    { key: "customer", title: "Customer" },
    { key: "date", title: "Date" },
    { 
      key: "amount", 
      title: "Amount",
      render: (row: any) => (
        <div className="font-medium">${row.amount.toFixed(2)}</div>
      )
    },
    { 
      key: "items", 
      title: "Items",
      render: (row: any) => (
        <Badge variant="outline">{row.items}</Badge>
      )
    },
    { 
      key: "paymentMethod", 
      title: "Payment Method",
      render: (row: any) => (
        <div className="font-medium">{row.paymentMethod}</div>
      )
    },
    { 
      key: "status", 
      title: "Status",
      render: (row: any) => (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {row.status}
        </Badge>
      )
    },
    { 
      key: "actions", 
      title: "Actions",
      render: (row: any) => (
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
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Sales Management" 
        description="View and manage all pharmacy sales and transactions."
      >
        <Link to="/sales/new">
          <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
            <Plus className="mr-1 h-4 w-4" /> New Sale
          </Button>
        </Link>
      </PageTitle>

      <DataTable 
        columns={columns} 
        data={sales} 
        keyField="id" 
      />
    </div>
  );
}
