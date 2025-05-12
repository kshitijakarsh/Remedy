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
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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
        "flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-poppins transition-all duration-200",
        active
          ? "bg-pharmacy-primary/10 text-pharmacy-primary border-l-4 border-pharmacy-primary"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon
        size={18}
        className={active ? "text-pharmacy-primary" : "text-gray-500"}
      />
      {title}
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
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

  // Overlay to close sidebar on mobile when clicking outside
  const Overlay = isOpen ? (
    <div
      className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
      onClick={handleToggle}
    />
  ) : null;

  return (
    <>
      {Overlay}

      {/* Mobile menu button */}
      <Button
        onClick={handleToggle}
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden rounded-full shadow-sm border-gray-200 bg-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-gray-100 bg-white shadow-sm transition-all duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-gray-100 px-6">
            <Link to="/" className="flex items-center gap-x-2">
              <div className="flex flex-col">
                <span className="text-lg font-poppins text-gray-900">
                  Remedy
                </span>
                <span className="text-xs text-gray-500">Pharmacy System</span>
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-6 px-4">
            <div className="mb-6">
              <h3 className="mb-2 px-3 text-xs font-poppins uppercase tracking-wider text-gray-500">
                Main Menu
              </h3>
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
          </div>
        </div>
      </aside>
    </>
  );
}
