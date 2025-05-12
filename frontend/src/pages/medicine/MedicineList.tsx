import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  MoreHorizontal, 
  Pill, 
  Calendar, 
  Package, 
  DollarSign, 
  Building 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

interface Medicine {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  price: number;
  supplier: string;
  status: "Low Stock" | "Expiring Soon" | "In Stock";
}

export default function MedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/medicines/all");
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    getMedicines();
  }, []);

  const handleDelete = (id: string) => {
    setMedicineToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (medicineToDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/medicines/${medicineToDelete}`);
        if (response.status === 200) {
          setMedicines(medicines.filter((medicine) => medicine.id !== medicineToDelete));
          setDeleteDialogOpen(false);
          setMedicineToDelete(null);
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  const columns = [
    { 
      key: "name", 
      title: "Medicine Name",
      render: (row: Medicine) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <Pill className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      )
    },
    { 
      key: "batchNumber", 
      title: "Batch #",
      render: (row: Medicine) => (
        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded-md">
          {row.batchNumber}
        </span>
      )
    },
    { 
      key: "expiryDate", 
      title: "Expiry Date",
      render: (row: Medicine) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className={`text-sm ${
            row.status === "Expiring Soon" ? "text-red-600 font-medium" : "text-gray-600"
          }`}>
            {row.expiryDate}
          </span>
        </div>
      )
    },
    { 
      key: "quantity", 
      title: "Quantity",
      render: (row: Medicine) => (
        <div className="flex items-center">
          <Package className="h-4 w-4 text-gray-400 mr-2" />
          <span className={`font-medium ${
            row.status === "Low Stock" ? "text-amber-600" : "text-gray-700"
          }`}>
            {row.quantity}
          </span>
        </div>
      )
    },
    { 
      key: "price", 
      title: "Price",
      render: (row: Medicine) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
          <span className="font-medium text-gray-900">
            {row.price.toFixed(2)}
          </span>
        </div>
      )
    },
    { 
      key: "supplier", 
      title: "Supplier",
      render: (row: Medicine) => (
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-700">{row.supplier}</span>
        </div>
      )
    },
    { 
      key: "status", 
      title: "Status",
      render: (row: Medicine) => {
        if (row.status === "Low Stock") {
          return (
            <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
              <AlertTriangle className="mr-1 h-3 w-3" /> Low Stock
            </div>
          );
        } else if (row.status === "Expiring Soon") {
          return (
            <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
              <AlertTriangle className="mr-1 h-3 w-3" /> Expiring Soon
            </div>
          );
        } else {
          return (
            <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> In Stock
            </div>
          );
        }
      }
    },
    { 
      key: "actions", 
      title: "Actions",
      render: (row: Medicine) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-md shadow-lg">
              <DropdownMenuItem asChild>
                <Link to={`/medicine/${row.id}/edit`} className="flex w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-50">
                  <Edit className="mr-2 h-4 w-4 text-blue-600" /> Edit Medicine
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.id)} className="flex cursor-pointer items-center py-2 px-3 hover:bg-red-50 text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Medicine
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <PageTitle 
        title="Medicine Management" 
        description="View and manage your pharmacy's medicine inventory."
      >
        <Link to="/dashboard/medicine/new">
          <Button className="h-10 bg-pharmacy-primary hover:bg-pharmacy-secondary text-white font-medium px-4 rounded-md shadow-sm transition-all hover:shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add Medicine
          </Button>
        </Link>
      </PageTitle>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="text-lg font-semibold text-gray-800">Medicine Inventory</h3>
            <p className="text-sm text-gray-500">
              Manage your medications, track stock levels, and monitor expiry dates
            </p>
          </div>
          
          <DataTable 
            columns={columns} 
            data={medicines} 
            keyField="id"
            isLoading={loading}
            searchable={true}
            searchPlaceholder="Search medicines by name, batch, supplier..."
            pagination={true}
            pageSize={10}
            emptyMessage="No medicines found. Add your first medicine to get started."
            className="border-collapse"
            tableClassName="min-w-full"
            headerClassName="bg-gray-50 text-gray-500 text-sm font-medium"
            rowClassName="hover:bg-gray-50 border-b border-gray-100" 
          />
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              This action cannot be undone. This will permanently delete the medicine 
              from your inventory and all associated records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}