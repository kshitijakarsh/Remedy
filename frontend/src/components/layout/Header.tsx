
import { Bell, Search, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

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

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = getBreadcrumbTitle(location.pathname);
  
  // Add authentication state (you should replace this with your actual auth state management)
  const isAuthenticated = false; // Replace with your auth check
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <a href="/" className="text-sm text-pharmacy-primary hover:text-pharmacy-secondary">Home</a>
            </li>
            {location.pathname !== "/" && (
              <>
                <li>
                  <div className="flex items-center">
                    <span className="mx-1 text-gray-400">/</span>
                    <span className="text-sm text-gray-500">{title}</span>
                  </div>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="relative hidden md:block">
          <Search 
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" 
          />
          <Input 
            placeholder="Search..." 
            className="w-64 pl-9 rounded-full bg-gray-50 focus-visible:ring-pharmacy-primary" 
          />
        </div>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar>
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-pharmacy-primary text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button
              variant="ghost"
              className="flex items-center gap-x-2 text-gray-700 hover:text-pharmacy-primary"
              onClick={handleLogin}
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-x-2 bg-pharmacy-primary hover:bg-pharmacy-secondary"
              onClick={handleSignup}
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign up</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
