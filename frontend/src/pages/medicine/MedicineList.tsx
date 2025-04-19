
import { useState } from "react";
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

// Sample medicine data
const medicines = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    batchNumber: "BT-001",
    expiryDate: "2026-06-30",
    quantity: 120,
    price: 9.99,
    supplier: "ABC Pharmaceuticals",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    batchNumber: "BT-002",
    expiryDate: "2026-05-15",
    quantity: 85,
    price: 15.50,
    supplier: "Med Supplies Inc.",
    status: "In Stock",
  },
  {
    id: "3",
    name: "Aspirin 100mg",
    batchNumber: "BT-003",
    expiryDate: "2025-08-20",
    quantity: 200,
    price: 5.25,
    supplier: "Health Products Ltd",
    status: "In Stock",
  },
  {
    id: "4",
    name: "Vitamin C 1000mg",
    batchNumber: "BT-004",
    expiryDate: "2025-04-12",
    quantity: 8,
    price: 12.75,
    supplier: "Wellness Distributors",
    status: "Low Stock",
  },
  {
    id: "5",
    name: "Ibuprofen 400mg",
    batchNumber: "BT-005",
    expiryDate: "2025-04-30",
    quantity: 95,
    price: 8.50,
    supplier: "ABC Pharmaceuticals",
    status: "In Stock",
  },
  {
    id: "6",
    name: "Cetirizine 10mg",
    batchNumber: "BT-006",
    expiryDate: "2025-04-01",
    quantity: 15,
    price: 11.25,
    supplier: "Med Supplies Inc.",
    status: "Expiring Soon",
  },
  {
    id: "7",
    name: "Metformin 500mg",
    batchNumber: "BT-007",
    expiryDate: "2027-09-15",
    quantity: 150,
    price: 18.99,
    supplier: "Health Products Ltd",
    status: "In Stock",
  },
  {
    id: "8",
    name: "Omeprazole 20mg",
    batchNumber: "BT-008",
    expiryDate: "2026-11-20",
    quantity: 60,
    price: 14.50,
    supplier: "Wellness Distributors",
    status: "In Stock",
  }
];

export default function MedicineList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setMedicineToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting medicine with ID: ${medicineToDelete}`);
    // In a real app, you would delete the medicine from your data store here
    setDeleteDialogOpen(false);
    setMedicineToDelete(null);
  };

  const columns = [
    { key: "name", title: "Medicine Name" },
    { key: "batchNumber", title: "Batch #" },
    { key: "expiryDate", title: "Expiry Date" },
    { 
      key: "quantity", 
      title: "Quantity",
      render: (row: any) => (
        <div>{row.quantity}</div>
      )
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
        <Link to="/medicine/new">
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

      {/* Delete Confirmation Dialog */}
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
