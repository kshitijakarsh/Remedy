
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Sample suppliers data
const suppliers = [
  {
    id: "1",
    name: "ABC Pharmaceuticals",
    contactPerson: "David Miller",
    phone: "(555) 111-2222",
    email: "contact@abcpharma.com",
    address: "123 Pharma St, Medical City, MD",
    products: 35
  },
  {
    id: "2",
    name: "Med Supplies Inc.",
    contactPerson: "Sarah Johnson",
    phone: "(555) 333-4444",
    email: "info@medsupplies.com",
    address: "456 Health Ave, Welltown, NY",
    products: 28
  },
  {
    id: "3",
    name: "Health Products Ltd",
    contactPerson: "Michael Chen",
    phone: "(555) 555-6666",
    email: "sales@healthproducts.com",
    address: "789 Wellness Rd, Vitality, CA",
    products: 42
  },
  {
    id: "4",
    name: "Wellness Distributors",
    contactPerson: "Emma Rodriguez",
    phone: "(555) 777-8888",
    email: "orders@wellnessdist.com",
    address: "101 Care Lane, Treatment, TX",
    products: 19
  },
];

export default function SuppliersList() {
  const columns = [
    { key: "name", title: "Company Name" },
    { key: "contactPerson", title: "Contact Person" },
    { 
      key: "contact", 
      title: "Contact",
      render: (row: any) => (
        <div className="flex flex-col">
          <div className="flex items-center text-sm">
            <Phone className="mr-2 h-3 w-3 text-gray-500" />
            {row.phone}
          </div>
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-3 w-3 text-gray-500" />
            {row.email}
          </div>
        </div>
      )
    },
    { key: "address", title: "Address" },
    { 
      key: "products", 
      title: "Products",
      render: (row: any) => (
        <div className="font-medium">{row.products}</div>
      )
    },
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
              <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Edit Supplier</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">View Orders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Supplier Management" 
        description="View and manage your medicine suppliers."
      >
        <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
          <Plus className="mr-1 h-4 w-4" /> Add Supplier
        </Button>
      </PageTitle>

      <DataTable 
        columns={columns} 
        data={suppliers} 
        keyField="id" 
      />
    </div>
  );
}
