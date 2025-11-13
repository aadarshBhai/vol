import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Debug: Log environment variables
    console.log('Environment variables:', {
      VITE_ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL,
      VITE_ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD ? '***' : 'Not set'
    });
    
    // Debug: Log entered credentials (don't log actual password in production)
    console.log('Login attempt with:', { email, password: '***' });

    try {
      // Get credentials from environment variables
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
      
      console.log('Comparing with:', { 
        expectedEmail: adminEmail, 
        emailMatch: email === adminEmail,
        passwordMatch: password === adminPassword 
      });
      
      if (email === adminEmail && password === adminPassword) {
        // Store admin token in localStorage
        localStorage.setItem("adminToken", "dummy-admin-token");
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
        });
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
