import { useState, useEffect } from "react";
import axios from "axios";
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
  ResponsiveContainer,
} from "recharts";
import { DataTable } from "@/components/ui/data-table";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0); // New state for medicine count

  // Fetch Sales Overview
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/analytics/monthly-sales")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  // Fetch Recent Sales
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sale/sales")
      .then((response) => setRecentSales(response.data))
      .catch((error) => console.error("Error fetching recent sales:", error));
  }, []);

  // Fetch Low Stock Items
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/medicines/all")
      .then((response) => {
        // Filter low stock items based on the threshold
        const lowStock = response.data.filter(
          (item) => item.stock < item.threshold
        );
        setLowStockItems(lowStock);
        // Set the total medicine count (total number of medicines)
        setMedicineCount(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching low stock items:", error)
      );
  }, []);

  // Fetch Total Sales
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/analytics/monthly-sales")
      .then((response) => {
        // Calculate total sales from the monthly data
        const total = response.data.reduce((acc, item) => acc + item.total, 0);
        setTotalSales(total);
      })
      .catch((error) => console.error("Error fetching total sales:", error));
  }, []);

  // Fetch Active Customers
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setActiveCustomers(response.data.length))
      .catch((error) =>
        console.error("Error fetching active customers:", error)
      );
  }, []);

  const recentSalesColumns = [
    { key: "customer", title: "Customer" },
    {
      key: "amount",
      title: "Amount",
      render: (row: any) => `$${row.amount.toFixed(2)}`,
    },
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
      ),
    },
  ];

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
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Active Customers"
          value={activeCustomers.toString()}
          icon={<Users className="h-5 w-5" />}
          change={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Medicine Count"
          value={medicineCount.toString()}
          icon={<Package className="h-5 w-5" />}
          change={{ value: "3%", positive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems.length.toString()}
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
                      border: "1px solid #e2e8f0",
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
};

export default Dashboard;
