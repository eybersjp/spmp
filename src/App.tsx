import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import SystemDesigner from "./pages/SystemDesigner";
import EnergyAnalysis from "./pages/EnergyAnalysis";
import FinancialAnalysis from "./pages/FinancialAnalysis";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import DocumentManagement from "./pages/DocumentManagement";
import FieldOperations from "./pages/FieldOperations";
import Notifications from "./pages/Notifications";
import SafetyCompliance from "./pages/SafetyCompliance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { 
  BarChart3, 
  Calculator, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Bell, 
  Shield
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId" element={<ClientDetail />} />
            <Route path="/designer" element={<SystemDesigner />} />
            
            {/* Analysis Routes */}
            <Route path="/energy" element={<EnergyAnalysis />} />
            <Route path="/financial" element={<FinancialAnalysis />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            
            {/* Operations Routes */}
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/field" element={<FieldOperations />} />
            <Route path="/notifications" element={<Notifications />} />
            
            {/* System Routes */}
            <Route path="/compliance" element={<SafetyCompliance />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
