
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { DataTable } from "@/components/ui/data-table";

// Sample data for charts
const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 3600 },
  { name: "Jun", total: 2900 },
  { name: "Jul", total: 3800 },
  { name: "Aug", total: 4200 },
  { name: "Sep", total: 3700 },
  { name: "Oct", total: 3500 },
  { name: "Nov", total: 4000 },
  { name: "Dec", total: 4800 },
];

const categoryData = [
  { name: "Antibiotics", value: 35 },
  { name: "Pain Relief", value: 25 },
  { name: "Vitamins", value: 15 },
  { name: "Skin Care", value: 12 },
  { name: "Digestive", value: 8 },
  { name: "Others", value: 5 },
];

const topSellingData = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    unitsSold: 457,
    revenue: 4565.43
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    unitsSold: 385,
    revenue: 5967.50
  },
  {
    id: "3",
    name: "Vitamin C 1000mg",
    category: "Vitamins",
    unitsSold: 324,
    revenue: 4131.00
  },
  {
    id: "4",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    unitsSold: 312,
    revenue: 2652.00
  },
  {
    id: "5",
    name: "Cetirizine 10mg",
    category: "Allergy",
    unitsSold: 293,
    revenue: 3296.25
  },
];

const expiringData = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    batchNumber: "BT-1245",
    quantity: 75,
    expiryDate: "2025-06-20"
  },
  {
    id: "2",
    name: "Cetirizine 10mg",
    batchNumber: "BT-2134",
    quantity: 40,
    expiryDate: "2025-06-25"
  },
  {
    id: "3",
    name: "Vitamin B Complex",
    batchNumber: "BT-3442",
    quantity: 50,
    expiryDate: "2025-07-10"
  },
  {
    id: "4",
    name: "Omeprazole 20mg",
    batchNumber: "BT-5633",
    quantity: 30,
    expiryDate: "2025-07-15"
  },
];

const COLORS = ['#1EAEDB', '#33C3F0', '#D3E4FD', '#F2FCE2', '#8B5CF6', '#e2e8f0'];

export default function ReportsAnalytics() {
  // Top selling medicines table columns
  const topSellingColumns = [
    { key: "name", title: "Medicine Name" },
    { key: "category", title: "Category" },
    { 
      key: "unitsSold", 
      title: "Units Sold",
      render: (row: any) => (
        <div className="font-medium">{row.unitsSold}</div>
      )
    },
    { 
      key: "revenue", 
      title: "Revenue",
      render: (row: any) => (
        <div className="font-medium">${row.revenue.toFixed(2)}</div>
      )
    },
  ];

  // Expiring medicines table columns
  const expiringColumns = [
    { key: "name", title: "Medicine Name" },
    { key: "batchNumber", title: "Batch Number" },
    { key: "quantity", title: "Quantity" },
    { key: "expiryDate", title: "Expiry Date" },
    { 
      key: "status", 
      title: "Status",
      render: () => (
        <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          Expiring Soon
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Reports & Analytics" 
        description="View sales reports and inventory analytics."
      />
      
      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Analytics</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Medicines</TabsTrigger>
        </TabsList>
        
        {/* Sales Analytics Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0"
                        }} 
                        formatter={(value: number) => [`$${value}`, "Sales"]}
                      />
                      <Bar dataKey="total" fill="#1EAEDB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={topSellingColumns}
                data={topSellingData}
                keyField="id"
                searchable={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Inventory Analytics Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#1EAEDB" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                      name="Stock Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Expiring Medicines Tab */}
        <TabsContent value="expiring">
          <Card>
            <CardHeader>
              <CardTitle>Expiring Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={expiringColumns}
                data={expiringData}
                keyField="id"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
