import { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalPurchases: number;
  lastVisit: string;
}

export default function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    { key: "name", title: "Name" },
    { key: "phone", title: "Phone" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    {
      key: "totalPurchases",
      title: "Total Purchases",
      render: (row: Customer) => <div className="font-medium">{row.totalPurchases}</div>,
    },
    { key: "lastVisit", title: "Last Visit" },
    {
      key: "actions",
      title: "Actions",
      render: (row: Customer) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`/customers/${row.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
              </Link>
              <Link to={`/customers/${row.id}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" /> Edit Customer
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle title="Customer Management" description="View and manage your pharmacy customers.">
        <Link to="/dashboard/customers/new">
          <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
            <Plus className="mr-1 h-4 w-4" /> Add Customer
          </Button>
        </Link>
      </PageTitle>

      <DataTable columns={columns} data={customers} keyField="id" />
    </div>
  );
}
