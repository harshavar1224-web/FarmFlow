import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Toaster } from "@workspace/farmflow-design-system/components/ui/toaster";
import { TooltipProvider } from "@workspace/farmflow-design-system/components/ui/tooltip";
import { DemoCartProvider } from "@/features/farmflow/cart-context";
import { SiteShell } from "@/components/SiteShell";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import Product from "@/pages/Product";
import Farm from "@/pages/Farm";
import Cart from "@/pages/Cart";
import Forecast from "@/pages/Forecast";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoCartProvider>
        <TooltipProvider>
          <SiteShell>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/marketplace" component={Marketplace} />
              <Route path="/product/:id" component={Product} />
              <Route path="/farm/:id" component={Farm} />
              <Route path="/cart" component={Cart} />
              <Route path="/farmer/forecast" component={Forecast} />
              <Route component={NotFound} />
            </Switch>
          </SiteShell>
          <Toaster />
        </TooltipProvider>
      </DemoCartProvider>
    </QueryClientProvider>
  );
}

export default App;
