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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

const ReportsAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [expiringData, setExpiringData] = useState([]);
  const [inventoryTrends, setInventoryTrends] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
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
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {/* Monthly Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sales by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {categoryData.length === 0 ? (
            <p className="text-sm text-gray-500">No category data available.</p>
          ) : (
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
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top Selling Medicines */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Medicines</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] overflow-auto">
          {topSellingData.length === 0 ? (
            <p className="text-sm text-gray-500">No top selling data available.</p>
          ) : (
            <ul className="space-y-2">
              {topSellingData.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.unitsSold}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Inventory Trends (Monthly Quantity) */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Inventory Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={inventoryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expiring Medicines */}
      <Card>
        <CardHeader>
          <CardTitle>Expiring Medicines</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] overflow-auto">
          {expiringData.length === 0 ? (
            <p className="text-sm text-gray-500">No expiring data available.</p>
          ) : (
            <ul className="space-y-2">
              {expiringData.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-sm text-red-500">{item.expiryDate}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
