import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertTriangle, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import axios from "axios";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/medicines/all");
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
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
          setMedicines(medicines.filter((medicine: any) => medicine.id !== medicineToDelete));
          setDeleteDialogOpen(false);
          setMedicineToDelete(null);
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  const columns = [
    { key: "name", title: "Medicine Name" },
    { key: "batchNumber", title: "Batch #" },
    { key: "expiryDate", title: "Expiry Date" },
    { 
      key: "quantity", 
      title: "Quantity",
      render: (row: any) => <div>{row.quantity}</div>
    },
    { 
      key: "price", 
      title: "Price",
      render: (row: any) => `$${row.price.toFixed(2)}`
    },
    { key: "supplier", title: "Supplier" },
    { 
      key: "status", 
      title: "Status",
      render: (row: any) => {
        if (row.status === "Low Stock") {
          return (
            <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              <AlertTriangle className="mr-1 h-3 w-3" /> Low Stock
            </div>
          );
        } else if (row.status === "Expiring Soon") {
          return (
            <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <AlertTriangle className="mr-1 h-3 w-3" /> Expiring Soon
            </div>
          );
        } else {
          return (
            <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              In Stock
            </div>
          );
        }
      }
    },
    { 
      key: "actions", 
      title: "Actions",
      render: (row: any) => (
        <div className="flex space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/medicine/${row.id}/edit`} className="flex w-full cursor-pointer items-center">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.id)} className="flex cursor-pointer items-center text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Medicine Management" 
        description="View and manage your pharmacy's medicine inventory."
      >
        <Link to="/dashboard/medicine/new">
          <Button className="h-9 bg-pharmacy-primary hover:bg-pharmacy-secondary">
            <Plus className="mr-1 h-4 w-4" /> Add Medicine
          </Button>
        </Link>
      </PageTitle>

      <DataTable 
        columns={columns} 
        data={medicines} 
        keyField="id" 
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the medicine 
              from your inventory.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
