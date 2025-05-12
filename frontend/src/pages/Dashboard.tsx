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

type Sale = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
};

type Medicine = {
  id: string;
  name: string;
  stock: number;
  threshold: number;
  supplier: string;
};

type SalesDataPoint = {
  name: string;
  total: number;
};

const Dashboard = () => {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [lowStockItems, setLowStockItems] = useState<Medicine[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/analytics/monthly-sales")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sale/sales")
      .then((response) => {
        // Sort sales by createdAt in descending order (latest first)
        const sortedSales = response.data.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        // Replace customerId with customer name in the recent sales data
        const updatedSales = sortedSales.map((sale: any) => ({
          ...sale,
          customer: sale.customerId, // Update with the actual customer name later
        }));
        setRecentSales(updatedSales);
      })
      .catch((error) => console.error("Error fetching recent sales:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/medicines/all")
      .then((response) => {
        const lowStock = response.data.filter(
          (item) => item.stock < item.threshold
        );
        setLowStockItems(lowStock);
        setMedicineCount(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching low stock items:", error)
      );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/analytics/monthly-sales")
      .then((response) => {
        const total = response.data.reduce((acc, item) => acc + item.total, 0);
        setTotalSales(total);
      })
      .catch((error) => console.error("Error fetching total sales:", error));
  }, []);

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
      render: (row: any) => (
        <span className="font-medium text-gray-900">
          ${row.amount?.toFixed(2) ?? "0.00"}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row: any) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            row.status === "Completed"
              ? "bg-green-100 text-green-800"
              : row.status === "Processing"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "date",
      title: "Date",
      render: (row: any) => (
        <span className="text-gray-500 text-sm">{row.date}</span>
      ),
    },
  ];

  const lowStockColumns = [
    {
      key: "name",
      title: "Medicine",
      render: (row: any) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "stock",
      title: "Current Stock",
      render: (row: any) => (
        <span className="font-medium text-red-600">{row.stock}</span>
      ),
    },
    { key: "threshold", title: "Threshold" },
    { key: "supplier", title: "Supplier" },
    {
      key: "status",
      title: "Status",
      render: () => (
        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800">
          Low Stock
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg">
      <PageTitle
        title="Dashboard"
        description="Overview of your pharmacy's performance and activity."
      />

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          change={{ value: "12%", positive: true }}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        />
        <StatCard
          title="Active Customers"
          value={activeCustomers.toString()}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          change={{ value: "5%", positive: true }}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        />
        <StatCard
          title="Medicine Count"
          value={medicineCount.toString()}
          icon={<Package className="h-5 w-5 text-purple-600" />}
          change={{ value: "3%", positive: true }}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems.length.toString()}
          icon={<BarChart3 className="h-5 w-5 text-orange-600" />}
          change={{ value: "2", positive: false }}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      border: "none",
                      padding: "12px",
                    }}
                    formatter={(value) => [`$${value}`, "Sales"]}
                    cursor={{ fill: "rgba(30, 174, 219, 0.1)" }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#1EAEDB"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 bg-white">
            <DataTable
              columns={recentSalesColumns}
              data={recentSales.slice(0, 5)}
              keyField="id"
              searchable={false}
              pagination={false}
              className="border-collapse"
              tableClassName="min-w-full"
              headerClassName="bg-gray-50 text-gray-500 text-sm font-medium"
              rowClassName="hover:bg-gray-50 border-b border-gray-100"
            />
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <div className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <DataTable
          columns={lowStockColumns}
          data={lowStockItems}
          keyField="id"
          searchable={false}
          pagination={false}
          className="border-collapse"
          tableClassName="min-w-full"
          headerClassName="bg-gray-50 text-gray-500 text-sm font-medium"
          rowClassName="hover:bg-gray-50 border-b border-gray-100"
        />
      </div>
    </div>
  );
};

export default Dashboard;
