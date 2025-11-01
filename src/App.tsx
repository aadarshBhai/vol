import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import PlanMyTrip from "./pages/PlanMyTrip";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import RequireAuth from "@/components/auth/RequireAuth";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Create a client with basic configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Global error handler for queries
queryClient.getQueryCache().config.onError = (error) => {
  console.error('Query Error:', error);
};

// Global error handler for mutations
queryClient.getMutationCache().config.onError = (error) => {
  console.error('Mutation Error:', error);
};

// Component to handle protected routes with auth
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};


// Wrap routes with error boundary
const AppRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/search" element={<SearchResults />} />
      <Route
        path="/plan-trip"
        element={
          <ErrorBoundary>
            <AuthWrapper>
              <PlanMyTrip />
            </AuthWrapper>
          </ErrorBoundary>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ErrorBoundary>
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          </ErrorBoundary>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={
          <ErrorBoundary>
            <AdminDashboard />
          </ErrorBoundary>
        } />
      </Route>
      
      {/* 404 - Keep this last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ErrorBoundary>
);

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
