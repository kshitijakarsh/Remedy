
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Supplier data for dropdown
const suppliers = [
  { id: "1", name: "ABC Pharmaceuticals" },
  { id: "2", name: "Med Supplies Inc." },
  { id: "3", name: "Health Products Ltd" },
  { id: "4", name: "Wellness Distributors" }
];

export default function MedicineForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new";
  
  // Sample data for edit mode
  const editData = isEditing ? {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer",
    batchNumber: "BT-001",
    expiryDate: new Date("2026-06-30"),
    quantity: 120,
    price: 9.99,
    supplierId: "1",
    reorderLevel: 30
  } : null;
  
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    description: editData?.description || "",
    batchNumber: editData?.batchNumber || "",
    expiryDate: editData?.expiryDate || null,
    quantity: editData?.quantity || 0,
    price: editData?.price || 0,
    supplierId: editData?.supplierId || "",
    reorderLevel: editData?.reorderLevel || 20
  });
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    // In a real app, you would save the data to your database here
    // then navigate back to the medicine list
    navigate("/medicine");
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title={isEditing ? "Edit Medicine" : "Add New Medicine"} 
        description={isEditing 
          ? "Update the details of an existing medicine"
          : "Add a new medicine to your inventory"
        }
      />
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Medicine Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Enter medicine name" 
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input 
                  id="batchNumber" 
                  placeholder="Enter batch number" 
                  value={formData.batchNumber}
                  onChange={(e) => handleChange("batchNumber", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expiryDate ? (
                        format(formData.expiryDate, "PPP")
                      ) : (
                        <span>Select expiry date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={formData.expiryDate || undefined}
                      onSelect={(date) => handleChange("expiryDate", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="0"
                  placeholder="Enter quantity" 
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0.01" 
                  step="0.01"
                  placeholder="Enter price" 
                  value={formData.price}
                  onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Reorder Level *</Label>
                <Input 
                  id="reorderLevel" 
                  type="number" 
                  min="1"
                  placeholder="Enter reorder level" 
                  value={formData.reorderLevel}
                  onChange={(e) => handleChange("reorderLevel", parseInt(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select 
                  value={formData.supplierId}
                  onValueChange={(value) => handleChange("supplierId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter medicine description" 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => navigate("/medicine")}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-pharmacy-primary hover:bg-pharmacy-secondary">
              {isEditing ? "Update Medicine" : "Add Medicine"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
