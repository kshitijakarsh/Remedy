import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Download, Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Customer {
  name: string;
  address: string;
  phone: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
}

export default function SaleInvoice() {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const response = await fetch(`http://localhost:3000/api/invoices/${id}`);
        const data = await response.json();
        setInvoiceData(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    }

    fetchInvoice();
  }, [id]);

  const handlePrint = () => window.print();

  const handleDownload = () => {
    alert("PDF download feature would be implemented here.");
  };

  if (!invoiceData) {
    return <div>Loading invoice...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle
          title="Invoice"
          description={`Invoice #${invoiceData.invoiceNumber}`}
        />
        <div className="flex space-x-2 print:hidden">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-1 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-1 h-4 w-4" /> Print
          </Button>
          <Link to="/sales">
            <Button variant="outline">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-pharmacy-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-xl">Remedy Pharmacy</h2>
                <p className="text-sm text-gray-500">Your Health, Our Priority</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <h3 className="font-bold text-xl">INVOICE</h3>
              <p className="text-sm text-gray-500">{invoiceData.invoiceNumber}</p>
              <p className="text-sm text-gray-500">Date: {invoiceData.date}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Bill To:</h4>
              <p className="text-sm">{invoiceData.customer.name}</p>
              <p className="text-sm text-gray-500">{invoiceData.customer.address}</p>
              <p className="text-sm text-gray-500">{invoiceData.customer.phone}</p>
            </div>
            <div className="md:text-right">
              <h4 className="font-semibold mb-2">Pharmacy Details:</h4>
              <p className="text-sm">Remedy Pharmacy</p>
              <p className="text-sm text-gray-500">456 Health Street, Medville, State, 54321</p>
              <p className="text-sm text-gray-500">(555) 987-6543</p>
            </div>
          </div>

          <Separator className="my-6" />

          <h4 className="font-semibold mb-4">Items</h4>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex flex-col items-end">
            <div className="w-full sm:w-80 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (7%):</span>
                <span>${invoiceData.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${invoiceData.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Payment Method:</span>
                <span>{invoiceData.paymentMethod}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">For any queries related to this invoice, please contact our pharmacy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
