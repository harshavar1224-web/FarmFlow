import { Link, useParams } from "wouter";
import { ArrowLeft, MapPin, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { useFarmProduct } from "@/features/farmflow/hooks";
import { useFarmFlowCart } from "@/features/farmflow/cart-context";

export default function Product() {
  const params = useParams<{ id: string }>();
  const productId = params.id ?? "";
  const query = useFarmProduct(productId);
  const cart = useFarmFlowCart();
  const [added, setAdded] = useState(false);
  if (query.isLoading) return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="grid gap-8 md:grid-cols-2"><div className="h-96 animate-pulse rounded-xl bg-muted" /><div className="h-96 animate-pulse rounded-xl bg-muted" /></div></main>;
  if (query.isError) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="error-product"><h1 className="text-2xl font-bold">Product details unavailable</h1><p className="mt-2 text-muted-foreground">We could not load this sample product.</p><Button className="mt-5" onClick={() => void query.refetch()} data-testid="button-retry-product">Try again</Button></main>;
  const product = query.data;
  if (!product) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="not-found-product"><h1 className="text-3xl font-bold">Produce not found</h1><p className="mt-2 text-muted-foreground">This sample listing may no longer be available.</p><Button asChild className="mt-5"><Link href="/marketplace" data-testid="link-product-not-found-marketplace">Back to marketplace</Link></Button></main>;
  const existingQuantity = cart.items.find((item) => item.productId === product.id)?.quantity ?? 0;
  const atQuantityLimit = existingQuantity >= product.availableQuantity;
  const addToCart = () => { if (!atQuantityLimit) { cart.addItem(product.id); setAdded(true); } };
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/marketplace" data-testid="link-back-marketplace" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Marketplace</Link>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="flex min-h-72 items-end rounded-2xl bg-secondary p-6 sm:min-h-[28rem] sm:p-10">
          <div><Badge variant="outline" className="bg-background/80" data-testid="status-product-freshness">{product.freshnessLabel}</Badge><p className="mt-5 text-sm font-semibold text-muted-foreground">{product.category}</p><p className="mt-1 text-5xl font-extrabold text-primary sm:text-7xl">{product.name.split(" ").map((word) => word[0]).join("")}</p></div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2"><Badge variant="secondary">{product.demandLabel}</Badge><Badge variant="outline">{product.harvestLabel}</Badge><Badge variant="outline">Demo listing</Badge></div>
          <h1 data-testid="heading-product-name" className="mt-4 text-4xl font-extrabold">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1"><Star className="size-4 fill-current text-accent-foreground" /> {product.rating} sample rating</span><span className="inline-flex items-center gap-1"><MapPin className="size-4" /> {product.location} · {product.distanceKm} km away</span></div>
          <p className="mt-6 leading-7 text-muted-foreground">{product.description}</p>
          <div className="mt-7 flex items-end justify-between border-y py-5"><div><p className="text-3xl font-extrabold">₹{product.priceRupees}<span className="text-base font-semibold text-muted-foreground"> / {product.unit}</span></p><p className="mt-1 text-sm text-muted-foreground">Sample price · {product.availableQuantity} {product.unit} shown available</p></div><span className="text-sm text-muted-foreground">Harvest: {product.harvestLabel}</span></div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={addToCart} disabled={atQuantityLimit} className="flex-1" data-testid="button-add-to-cart">{atQuantityLimit ? "Sample quantity limit reached" : added ? "Add one more to demo cart" : "Add to demo cart"}</Button>
            <Button disabled variant="outline" className="flex-1" data-testid="button-reservation-unavailable">Reserve produce</Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground" data-testid="text-reservation-unavailable">Reservations are unavailable while FarmFlow is in demo mode. Adding here only updates this tab’s demo cart.</p>
          {added && <p role="status" className="mt-3 text-sm font-semibold text-primary" data-testid="status-added-to-cart">Added to your tab-local demo cart.</p>}
          <Card className="mt-8"><CardContent className="flex items-start gap-3 p-4"><ShieldCheck className="mt-0.5 size-5 text-primary" /><div><p className="font-bold">Know your grower</p><p className="mt-1 text-sm text-muted-foreground">Raised by {product.farmerName} at {product.farmName} in {product.location}.</p><Button asChild variant="link" className="mt-2 h-auto p-0"><Link href={`/farm/${product.farmId}`} data-testid={`link-product-farm-${product.id}`}>Visit farm profile</Link></Button></div></CardContent></Card>
        </div>
      </div>
    </main>
  );
}
