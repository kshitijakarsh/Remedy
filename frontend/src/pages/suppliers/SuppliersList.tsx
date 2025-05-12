import { useEffect, useState } from "react";
import axios from "axios";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  Building,
  User,
  Package,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const columns = [
    {
      key: "name",
      title: "Company Name",
      render: (row: Supplier) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <Building className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "contactPerson",
      title: "Contact Person",
      render: (row: Supplier) => (
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-400 mr-2" />
          <span>{row.contactPerson}</span>
        </div>
      ),
    },
    {
      key: "contact",
      title: "Contact Info",
      render: (row: Supplier) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-sm">
            <Phone className="mr-2 h-3 w-3 text-gray-500" />
            <a
              href={`tel:${row.phone}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {row.phone}
            </a>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-3 w-3 text-gray-500" />
            <a
              href={`mailto:${row.email}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {row.email}
            </a>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      title: "Address",
      render: (row: Supplier) => (
        <div className="text-sm text-gray-600 max-w-xs truncate">
          {row.address}
        </div>
      ),
    },
    {
      key: "products",
      title: "Products",
      render: (row: Supplier) => (
        <div className="flex items-center">
          <span className="font-mediumtext-sm">
            {row.products}
          </span>
        </div>
      ),
    },
  ];

  const handleAddSupplier = () => {
    navigate("/dashboard/suppliers/new");
  };

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <PageTitle
        title="Supplier Management"
        description="View and manage your medicine suppliers."
      >
        <Button
          className="h-10 bg-pharmacy-primary hover:bg-pharmacy-secondary text-white font-medium px-4 rounded-md shadow-sm transition-all hover:shadow-md"
          onClick={handleAddSupplier}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Supplier
        </Button>
      </PageTitle>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="text-lg font-semibold text-gray-800">
              Supplier Directory
            </h3>
            <p className="text-sm text-gray-500">
              View, manage and contact your product suppliers
            </p>
          </div>

          <DataTable
            columns={columns}
            data={suppliers}
            keyField="id"
            isLoading={loading}
            searchable={true}
            searchPlaceholder="Search suppliers..."
            pagination={true}
            pageSize={10}
            emptyMessage="No suppliers found. Add your first supplier to get started."
            className="border-collapse"
            tableClassName="min-w-full"
            headerClassName="bg-gray-50 text-gray-500 text-sm font-medium"
            rowClassName="hover:bg-gray-50 border-b border-gray-100"
          />
        </CardContent>
      </Card>
    </div>
  );
}
