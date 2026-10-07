import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ShoppingBasket, Sprout } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { useFarmFlowMode } from "@/features/farmflow/hooks";
import { useFarmFlowCart } from "@/features/farmflow/cart-context";
import farmFlowLogo from "@assets/0_farmflow_logo_1791293490712.png";

export function SiteShell({ children }: { children: ReactNode }) {
  const mode = useFarmFlowMode();
  const cart = useFarmFlowCart();
  const [location] = useLocation();
  const links = [
    { href: "/", label: "Our promise" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/farmer/forecast", label: "Farmer forecast" },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" data-testid="link-brand-home" className="flex shrink-0 items-center">
            <img src={farmFlowLogo} alt="FarmFlow" className="h-12 w-24 object-contain object-left" data-testid="img-farmflow-logo" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(" ", "-")}`}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${location === link.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="outline" data-testid="status-demo-mode">Demo mode</Badge>
            <Button asChild variant="outline" size="sm">
              <Link href="/cart" data-testid="link-cart" className="relative">
                <ShoppingBasket aria-hidden="true" /> Cart
                {cart.itemCount > 0 && <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground" data-testid="text-cart-count">{cart.itemCount}</span>}
              </Link>
            </Button>
          </div>
        </div>
        <div className="border-t bg-muted/60 md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl justify-around px-2 py-2">
            {links.map((link) => <Link key={link.href} href={link.href} data-testid={`mobile-nav-${link.href.replaceAll("/", "-") || "home"}`}
              className={`rounded-md px-2 py-2 text-xs font-semibold ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>{link.label}</Link>)}
          </nav>
        </div>
      </header>
      <div role="note" data-testid="status-demo-notice" className="border-b bg-accent/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-xs text-muted-foreground sm:px-6">
          <Sprout className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{mode.notice}</span>
        </div>
      </div>
      {children}
      <footer className="mt-16 border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>FarmFlow — demand before harvest.</span>
          <Link href="/marketplace" data-testid="link-footer-marketplace" className="inline-flex items-center gap-2 font-semibold text-primary">
            Browse local produce <ArrowRight className="size-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
