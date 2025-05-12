import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { ChartPie, TrendingUp, Package, AlertTriangle, BarChart3 } from "lucide-react";

const COLORS = ["#1EAEDB", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

interface SalesData {
  month: string;
  total: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface TopSellingData {
  name: string;
  unitsSold: number;
}

interface ExpiringData {
  name: string;
  expiryDate: string;
  daysLeft: number;
}

interface InventoryTrend {
  month: string;
  total: number;
}

const ReportsAnalytics = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [topSellingData, setTopSellingData] = useState<TopSellingData[]>([]);
  const [expiringData, setExpiringData] = useState<ExpiringData[]>([]);
  const [inventoryTrends, setInventoryTrends] = useState<InventoryTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [
          monthlySalesRes,
          salesByCategoryRes,
          topSellingRes,
          expiringRes,
          inventoryTrendsRes
        ] = await Promise.all([
          axios.get("http://localhost:3000/api/analytics/monthly-sales"),
          axios.get("http://localhost:3000/api/analytics/sales-by-category"),
          axios.get("http://localhost:3000/api/analytics/top-selling"),
          axios.get("http://localhost:3000/api/analytics/expiring-medicines"),
          axios.get("http://localhost:3000/api/analytics/inventory-trends")
        ]);

        setSalesData(monthlySalesRes.data || []);
        setCategoryData(Array.isArray(salesByCategoryRes.data) ? salesByCategoryRes.data : []);
        setTopSellingData(Array.isArray(topSellingRes.data) ? topSellingRes.data : []);
        setExpiringData(Array.isArray(expiringRes.data) ? expiringRes.data : []);
        setInventoryTrends(Array.isArray(inventoryTrendsRes.data) ? inventoryTrendsRes.data : []);
      } catch (err) {
        console.error("Failed to fetch analytics data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Custom tooltip formatter for currency
  const currencyFormatter = (value: number) => `$${value.toFixed(2)}`;

  // Custom label component for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <PageTitle 
        title="Reports & Analytics" 
        description="Review your pharmacy's performance metrics and trends."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Sales Chart */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">Monthly Sales</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 bg-white">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    tickFormatter={currencyFormatter}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      border: "none",
                      padding: "12px",
                    }}
                    cursor={{ fill: 'rgba(30, 174, 219, 0.1)' }}
                  />
                  <Bar dataKey="total" fill="#1EAEDB" radius={[4, 4, 0, 0]} barSize={40} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <ChartPie className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">Sales by Category</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 bg-white">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : categoryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ChartPie className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-sm">No category data available.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      border: "none",
                      padding: "12px",
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center" 
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-xs text-gray-700">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Top Selling Medicines */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">Top Selling Medicines</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 bg-white overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : topSellingData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Package className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-sm">No top selling data available.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {topSellingData.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <span className="font-medium text-lg w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-3">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
                      {item.unitsSold} units
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Inventory Trends (Monthly Quantity) */}
        <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">Inventory Trends</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 bg-white">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inventoryTrends} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [value, 'Units']}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      border: "none",
                      padding: "12px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#82ca9d" 
                    strokeWidth={3} 
                    dot={{ fill: '#82ca9d', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#82ca9d', stroke: '#ffffff', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Expiring Medicines */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-0">
          <CardHeader className="bg-white border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">Expiring Medicines</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 bg-white overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : expiringData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <AlertTriangle className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-sm">No expiring medicines found.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {expiringData.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-red-600 font-medium">{item.expiryDate}</span>
                      <span className={`text-xs ${
                        item.daysLeft < 30 ? "text-red-500" : "text-amber-500"
                      }`}>
                        {item.daysLeft} days left
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;