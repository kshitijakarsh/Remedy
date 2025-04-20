import { useEffect, useState } from "react";
import axios from "axios";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Phone, Mail } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom"; 

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  products: number;
}

export default function SuppliersList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const columns = [
    { key: "name", title: "Company Name" },
    { key: "contactPerson", title: "Contact Person" },
    { key: "contact", title: "Contact", render: (row: any) => (
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
    )},
    { key: "address", title: "Address" },
    { key: "products", title: "Products", render: (row: any) => <div className="font-medium">{row.products}</div> },
    { key: "actions", title: "Actions", render: (row: any) => (
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
    )}
  ];

  const handleAddSupplier = () => {
    navigate("/dashboard/suppliers/new");
  };

  return (
    <div className="space-y-6">
      <PageTitle title="Supplier Management" description="View and manage your medicine suppliers.">
        <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary" onClick={handleAddSupplier}>
          <Plus className="mr-1 h-4 w-4" /> Add Supplier
        </Button>
      </PageTitle>

      <DataTable columns={columns} data={suppliers} keyField="id" />
    </div>
  );
}
