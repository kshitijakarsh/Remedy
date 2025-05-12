import {
  Bell,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const getBreadcrumbTitle = (path: string) => {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/medicine":
      return "Medicine Management";
    case "/sales":
      return "Sales Management";
    case "/customers":
      return "Customer Management";
    case "/suppliers":
      return "Supplier Management";
    case "/reports":
      return "Reports & Analytics";
    default:
      if (path.includes("/medicine/")) return "Medicine Details";
      if (path.includes("/sales/")) return "Sale Details";
      if (path.includes("/customers/")) return "Customer Details";
      if (path.includes("/suppliers/")) return "Supplier Details";
      return "Dashboard";
  }
};

interface User {
  id: string;
  name: string;
  email: string;
}

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = getBreadcrumbTitle(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsUser(JSON.parse(user));
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-4 shadow-sm backdrop-blur-sm bg-white/90 md:px-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-poppins text-gray-800">{title}</h1>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-sm md:space-x-2">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="text-pharmacy-primary hover:text-pharmacy-secondary transition-colors duration-200"
              >
                Home
              </a>
            </li>
            {location.pathname !== "/" && (
              <>
                <li>
                  <div className="flex items-center">
                    <span className="mx-1 text-gray-400">/</span>
                    <span className="text-gray-500">{title}</span>
                  </div>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-pharmacy-primary focus-visible:border-pharmacy-primary transition-all duration-200"
          />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white hover:ring-pharmacy-primary transition-all duration-200"
                >
                  <Avatar>
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="bg-pharmacy-primary text-white font-poppins">
                      <User/>
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-1 rounded-lg shadow-lg border-gray-200"
              >
                <DropdownMenuLabel className="font-poppins">
                  {isUser && (
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-poppins text-gray-800">
                        {isUser.name}
                      </p>
                      <p className="text-xs text-gray-500">{isUser.email}</p>
                    </div>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-x-3">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-pharmacy-primary hover:bg-gray-50 transition-colors duration-200"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log in
            </Button>
            <Button
              variant="default"
              className="bg-pharmacy-primary hover:bg-pharmacy-secondary transition-colors duration-200 shadow-sm"
              onClick={handleSignup}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
