
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon && <div className="text-pharmacy-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="mt-1 flex items-center text-xs">
            <span
              className={cn(
                "mr-1",
                change.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {change.positive ? "↑" : "↓"} {change.value}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
