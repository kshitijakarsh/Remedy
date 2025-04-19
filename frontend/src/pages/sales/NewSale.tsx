
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2, Calculator } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample customers for dropdown
const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
  { id: "4", name: "Alice Williams" }
];

// Sample medicines for dropdown
const medicines = [
  { id: "1", name: "Paracetamol 500mg", price: 9.99, stock: 120 },
  { id: "2", name: "Amoxicillin 250mg", price: 15.50, stock: 85 },
  { id: "3", name: "Aspirin 100mg", price: 5.25, stock: 200 },
  { id: "4", name: "Vitamin C 1000mg", price: 12.75, stock: 8 },
  { id: "5", name: "Ibuprofen 400mg", price: 8.50, stock: 95 },
  { id: "6", name: "Cetirizine 10mg", price: 11.25, stock: 15 },
];

// Payment methods
const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Mobile Payment"];

interface SaleItem {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

export default function NewSale() {
  const navigate = useNavigate();
  
  const [customerId, setCustomerId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  
  const handleAddItem = () => {
    if (!selectedMedicine || quantity <= 0) return;
    
    const medicine = medicines.find(med => med.id === selectedMedicine);
    if (!medicine) return;
    
    const newItem: SaleItem = {
      id: Date.now().toString(),
      medicineId: medicine.id,
      medicineName: medicine.name,
      quantity: quantity,
      price: medicine.price,
      total: medicine.price * quantity
    };
    
    setItems(prev => [...prev, newItem]);
    setSelectedMedicine("");
    setQuantity(1);
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // Assuming 7% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sale submitted:", {
      customerId,
      paymentMethod,
      items,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal()
    });
    
    // In a real app, you would save the sale and generate an invoice
    navigate("/sales");
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="New Sale" 
        description="Create a new sale and generate invoice."
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Customer Selection and Payment Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Customer & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Select Customer *</Label>
                <Select 
                  value={customerId}
                  onValueChange={setCustomerId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sale Items */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sale Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add new item form */}
                <div className="flex flex-wrap items-end gap-2">
                  <div className="flex-1 min-w-[200px] space-y-2">
                    <Label htmlFor="medicine">Medicine</Label>
                    <Select 
                      value={selectedMedicine}
                      onValueChange={setSelectedMedicine}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select medicine" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicines.map(medicine => (
                          <SelectItem key={medicine.id} value={medicine.id}>
                            {medicine.name} - ${medicine.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24 space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex-none">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={handleAddItem}
                      disabled={!selectedMedicine || quantity <= 0}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                  </div>
                </div>
                
                {/* Items table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No items added yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        items.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.medicineName}</TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Summary */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (7%):</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate("/sales")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-pharmacy-primary hover:bg-pharmacy-secondary"
                disabled={items.length === 0 || !customerId || !paymentMethod}
              >
                <Calculator className="mr-1 h-4 w-4" /> Complete Sale
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
