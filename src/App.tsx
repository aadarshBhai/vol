import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Packages from "./pages/Packages";
import PlanMyTrip from "./pages/PlanMyTrip";
import SearchResults from "./pages/SearchResults";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import TPT from "./pages/startbooking";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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

// Wrap routes with error boundary
const AppRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/plan-trip" element={
        <ErrorBoundary>
          <PlanMyTrip />
        </ErrorBoundary>
      } />
      <Route path="/about" element={<About />} />
      
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
        <Routes>
          <Route path="/startbooking" element={<TPT />} />
          <Route path="*" element={<AppRoutes />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
