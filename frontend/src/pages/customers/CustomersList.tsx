
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Sample customers data
const customers = [
  {
    id: "1",
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, CA",
    totalPurchases: 3,
    lastVisit: "2025-04-12"
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "(555) 987-6543",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Somewhere, NY",
    totalPurchases: 5,
    lastVisit: "2025-04-10"
  },
  {
    id: "3",
    name: "Bob Johnson",
    phone: "(555) 456-7890",
    email: "bob.johnson@example.com",
    address: "789 Pine Rd, Elsewhere, TX",
    totalPurchases: 2,
    lastVisit: "2025-04-05"
  },
  {
    id: "4",
    name: "Alice Williams",
    phone: "(555) 321-6547",
    email: "alice.williams@example.com",
    address: "987 Cedar Ln, Nowhere, FL",
    totalPurchases: 1,
    lastVisit: "2025-03-28"
  },
];

export default function CustomersList() {
  const columns = [
    { key: "name", title: "Name" },
    { key: "phone", title: "Phone" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { 
      key: "totalPurchases", 
      title: "Total Purchases",
      render: (row: any) => (
        <div className="font-medium">{row.totalPurchases}</div>
      )
    },
    { key: "lastVisit", title: "Last Visit" },
    { 
      key: "actions", 
      title: "Actions",
      render: (row: any) => (
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
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Customer Management" 
        description="View and manage your pharmacy customers."
      >
        <Link to="/customers/new">
          <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
            <Plus className="mr-1 h-4 w-4" /> Add Customer
          </Button>
        </Link>
      </PageTitle>

      <DataTable 
        columns={columns} 
        data={customers} 
        keyField="id" 
      />
    </div>
  );
}
