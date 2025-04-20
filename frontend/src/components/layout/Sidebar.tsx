
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  Users, 
  Truck, 
  BarChart3,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  active?: boolean;
}

const NavItem = ({ href, icon: Icon, title, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2.5 rounded-md px-3 py-2 text-sm font-medium transition-all",
        active ? 
          "bg-pharmacy-primary text-white" : 
          "text-gray-700 hover:bg-pharmacy-light hover:text-pharmacy-primary"
      )}
    >
      <Icon size={18} />
      {title}
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Medicine",
      href: "/dashboard/medicine",
      icon: Pill,
    },
    {
      title: "Sales",
      href: "/dashboard/sales",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Suppliers",
      href: "/dashboard/suppliers",
      icon: Truck,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        onClick={handleToggle}
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <Link to="/" className="flex items-center gap-x-2">
              <div className="h-8 w-8 rounded-full bg-pharmacy-primary flex items-center justify-center">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Remedy</span>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-4 px-3">
            <nav className="flex flex-col gap-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.title}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  active={location.pathname === item.href}
                />
              ))}
            </nav>
          </div>

          <div className="mt-auto border-t border-gray-200 px-3 py-4">
            <Button 
              variant="ghost" 
              className="flex w-full items-center gap-x-2.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-pharmacy-light hover:text-pharmacy-primary"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
