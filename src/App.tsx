import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PatientProvider } from "./context/PatientContext";
import Welcome from "./pages/Welcome";
import DemoLayout from "./pages/DemoLayout";
import Index from "./pages/Index";
import IdentityVerification from "./pages/IdentityVerification";
import RecordRetrieval from "./pages/RecordRetrieval";
import NotFound from "./pages/NotFound";
import RoutingBack from "./pages/RoutingBack";
import NttHandoff from "./pages/NttHandoff";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PatientProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Welcome />} />
          <Route path="/demo/:scenario" element={<DemoLayout />}>
            <Route index element={<Navigate to="consent" replace />} />
            <Route path="consent" element={<Index />} />
            <Route path="identity-verification" element={<IdentityVerification />} />
            <Route path="record-retrieval" element={<RecordRetrieval />} />
          </Route>
          <Route path="/loveable/demo/:scenario" element={<DemoLayout />}>
            <Route index element={<Navigate to="consent" replace />} />
            <Route path="consent" element={<Index />} />
            <Route path="identity-verification" element={<IdentityVerification />} />
            <Route path="record-retrieval" element={<RecordRetrieval />} />
          </Route>
          <Route path="/consent" element={<Index />} />
          <Route path="/identity-verification" element={<IdentityVerification />} />
          <Route path="/record-retrieval" element={<RecordRetrieval />} />
          <Route path="/ntt/:scenario" element={<NttHandoff />} />
          <Route path="/routing-back" element={<RoutingBack />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PatientProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
