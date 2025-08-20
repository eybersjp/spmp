import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import SystemDesigner from "./pages/SystemDesigner";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { 
  BarChart3, 
  Calculator, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Bell, 
  Shield, 
  Settings 
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
            <Route path="/designer" element={<SystemDesigner />} />
            
            {/* Analysis Routes */}
            <Route 
              path="/energy" 
              element={
                <PlaceholderPage 
                  title="Energy Analysis" 
                  description="Simulate production vs. consumption, savings, ROI, and payback period"
                  icon={BarChart3}
                />
              } 
            />
            <Route 
              path="/financial" 
              element={
                <PlaceholderPage 
                  title="Financial Analysis" 
                  description="Generate detailed quotes with financing, leasing, and PPA options"
                  icon={Calculator}
                />
              } 
            />
            <Route 
              path="/reports" 
              element={
                <PlaceholderPage 
                  title="Reports & Analytics" 
                  description="Interactive dashboards for performance, financials, and compliance status"
                  icon={TrendingUp}
                />
              } 
            />
            
            {/* Operations Routes */}
            <Route 
              path="/documents" 
              element={
                <PlaceholderPage 
                  title="Document Management" 
                  description="Upload, store, and annotate project files with digital signatures"
                  icon={FileText}
                />
              } 
            />
            <Route 
              path="/field" 
              element={
                <PlaceholderPage 
                  title="Field Operations" 
                  description="Mobile-first offline access with GPS tagging and progress tracking"
                  icon={MapPin}
                />
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <PlaceholderPage 
                  title="Notifications" 
                  description="Automated reminders and real-time alerts for system monitoring"
                  icon={Bell}
                />
              } 
            />
            
            {/* System Routes */}
            <Route 
              path="/compliance" 
              element={
                <PlaceholderPage 
                  title="Safety & Compliance" 
                  description="SANS electrical standards and SSEG procedures enforcement"
                  icon={Shield}
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PlaceholderPage 
                  title="Settings" 
                  description="Configure system preferences and integration settings"
                  icon={Settings}
                />
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
