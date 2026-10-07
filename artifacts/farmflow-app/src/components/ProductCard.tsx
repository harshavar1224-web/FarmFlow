import { Link } from "wouter";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import type { FarmProduct } from "@/features/farmflow/types";

export function ProductCard({ product }: { product: FarmProduct }) {
  return (
    <Card data-testid={`card-product-${product.id}`} className="group overflow-hidden rounded-xl transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative flex h-40 items-end overflow-hidden bg-secondary p-4 sm:h-48">
          <div aria-hidden="true" className="absolute -right-5 -top-8 size-40 rounded-full bg-primary/10" />
          <div aria-hidden="true" className="absolute right-8 top-8 size-20 rounded-full border border-primary/20" />
          <div className="relative flex w-full items-end justify-between">
            <div>
              <Badge variant="outline" data-testid={`status-harvest-${product.id}`} className="bg-background/85">{product.freshnessLabel}</Badge>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{product.category}</p>
            </div>
            <span className="text-4xl font-extrabold tracking-tight text-primary/80" aria-hidden="true">{product.name.split(" ").map((word) => word[0]).join("")}</span>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.farmName}</p>
            </div>
            <p className="shrink-0 font-bold" data-testid={`text-price-${product.id}`}>₹{product.priceRupees}<span className="text-xs font-medium text-muted-foreground"> / {product.unit}</span></p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {product.location} · {product.distanceKm} km</span>
            <span>{product.harvestLabel}</span>
          </div>
          <Button asChild className="w-full" variant="outline">
            <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}>View produce <ArrowUpRight /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
