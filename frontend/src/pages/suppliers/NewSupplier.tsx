import { useState } from "react";
import axios from "axios";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Home, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewSupplier() {
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newSupplier = {
      name,
      contactPerson,
      phone,
      email,
      address,
      products,
    };

    try {
      await axios.post("http://localhost:3000/api/suppliers", newSupplier);
      navigate("/dashboard/suppliers");
    } catch (err: any) {
      setError("Failed to create supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="New Supplier"
        description="Fill in the form below to add a new supplier."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
            placeholder="Enter contact person's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-gray-500" />
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-500" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-gray-500" />
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter company address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="products">Products</Label>
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-gray-500" />
            <Input
              id="products"
              type="number"
              value={products}
              onChange={(e) => setProducts(Number(e.target.value) || "")}
              required
              placeholder="Enter number of products"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-pharmacy-primary hover:bg-pharmacy-secondary"
          disabled={loading}
        >
          {loading ? "Adding Supplier..." : "Add Supplier"}
        </Button>
      </form>
    </div>
  );
}
