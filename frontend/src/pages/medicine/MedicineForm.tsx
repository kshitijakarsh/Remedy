import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const suppliers = [
  { id: "ABC Pharmaceuticals", name: "ABC Pharmaceuticals" },
  { id: "Med Supplies Inc.", name: "Med Supplies Inc." },
  { id: "Health Products Ltd", name: "Health Products Ltd" },
  { id: "Wellness Distributors", name: "Wellness Distributors" },
];

export default function MedicineForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    batchNumber: "",
    expiryDate: null,
    quantity: 0,
    price: 0,
    supplier: "",
    reorderLevel: 20,
  });

  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:3000/api/medicines/create";

    // Format expiryDate as a string in "yyyy-MM-dd" format
    const formattedExpiryDate = formData.expiryDate ? format(formData.expiryDate, "yyyy-MM-dd") : null;

    const preparedData = {
      ...formData,
      expiryDate: formattedExpiryDate, // Set formatted expiryDate
    };

    axios
      .post(url, preparedData)
      .then(() => {
        alert("Medicine added successfully!");
        navigate("/dashboard/medicine");  // Use navigate() to go to /dashboard/medicine after success
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Failed to add medicine. Please try again.");
      });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins">Add New Medicine</h1>
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
                      className="w-full justify-start text-left font-normal"
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
                  onChange={(e) =>
                    handleChange("quantity", parseInt(e.target.value))
                  }
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
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value))
                  }
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
                  onChange={(e) =>
                    handleChange("reorderLevel", parseInt(e.target.value))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => handleChange("supplier", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.name}>
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
            <Button variant="outline" type="button" onClick={() => alert("Cancel")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pharmacy-primary hover:bg-pharmacy-secondary">
              Add Medicine
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
