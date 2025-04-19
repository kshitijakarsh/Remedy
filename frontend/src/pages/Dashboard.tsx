
import { BarChart3, DollarSign, Package, Users } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DataTable } from "@/components/ui/data-table";

// Sample data for charts and tables
const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 3600 },
  { name: "Jun", total: 2900 },
];

const recentSales = [
  {
    id: "1",
    customer: "John Doe",
    amount: 159.99,
    status: "Completed",
    date: "2025-03-12",
  },
  {
    id: "2",
    customer: "Jane Smith",
    amount: 95.50,
    status: "Completed",
    date: "2025-03-11",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    amount: 245.75,
    status: "Completed",
    date: "2025-03-10",
  },
  {
    id: "4",
    customer: "Alice Williams",
    amount: 76.25,
    status: "Completed",
    date: "2025-03-09",
  },
];

const lowStockItems = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    stock: 8,
    threshold: 10,
    supplier: "ABC Pharmaceuticals",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    stock: 5,
    threshold: 15,
    supplier: "Med Supplies Inc.",
  },
  {
    id: "3",
    name: "Vitamin C 1000mg",
    stock: 3,
    threshold: 20,
    supplier: "Health Products Ltd",
  },
];

const recentSalesColumns = [
  { key: "customer", title: "Customer" },
  { key: "amount", title: "Amount", render: (row: any) => `$${row.amount.toFixed(2)}` },
  { key: "status", title: "Status" },
  { key: "date", title: "Date" },
];

const lowStockColumns = [
  { key: "name", title: "Medicine" },
  { key: "stock", title: "Current Stock" },
  { key: "threshold", title: "Threshold" },
  { key: "supplier", title: "Supplier" },
  { 
    key: "status", 
    title: "Status", 
    render: (row: any) => (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
        Low Stock
      </span>
    ) 
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Dashboard" 
        description="Overview of your pharmacy's performance and activity."
      />
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value="$12,765"
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Active Customers"
          value="437"
          icon={<Users className="h-5 w-5" />}
          change={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Medicine Count"
          value="285"
          icon={<Package className="h-5 w-5" />}
          change={{ value: "3%", positive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={<BarChart3 className="h-5 w-5" />}
          change={{ value: "2", positive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
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
                  <Bar 
                    dataKey="total" 
                    fill="#1EAEDB" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={recentSalesColumns}
              data={recentSales}
              keyField="id"
              searchable={false}
              pagination={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={lowStockColumns}
            data={lowStockItems}
            keyField="id"
          />
        </CardContent>
      </Card>
    </div>
  );
}
