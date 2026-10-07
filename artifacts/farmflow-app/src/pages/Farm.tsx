import { Link, useParams } from "wouter";
import { ArrowLeft, MapPin, Sprout, Star } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { useMarketplaceProducts } from "@/features/farmflow/hooks";
import { ProductCard } from "@/components/ProductCard";

export default function Farm() {
  const params = useParams<{ id: string }>();
  const query = useMarketplaceProducts();
  const farmId = params.id ?? "";
  if (query.isLoading) return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="h-48 animate-pulse rounded-xl bg-muted" /></main>;
  if (query.isError) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="error-farm"><h1 className="text-2xl font-bold">Farm profile unavailable</h1><p className="mt-2 text-muted-foreground">We could not load this sample farm profile.</p><Button className="mt-5" onClick={() => void query.refetch()} data-testid="button-retry-farm">Try again</Button></main>;
  const farmProducts = query.data?.filter((entry) => entry.farmId === farmId) ?? [];
  const product = farmProducts[0];
  if (!product) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="not-found-farm"><h1 className="text-3xl font-bold">Farm not found</h1><Button asChild className="mt-5"><Link href="/marketplace" data-testid="link-farm-not-found-marketplace">Back to marketplace</Link></Button></main>;
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href={`/product/${product.id}`} data-testid="link-back-product" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"><ArrowLeft className="size-4" /> Back to produce</Link>
      <Card className="overflow-hidden rounded-2xl">
        <div className="bg-secondary px-6 py-8 sm:px-10 sm:py-12"><Badge variant="outline" className="bg-background/80">Sample farm profile</Badge><div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Grown with care nearby</p><h1 className="mt-2 text-4xl font-extrabold sm:text-5xl" data-testid="heading-farm-name">{product.farmName}</h1><p className="mt-2 text-lg text-muted-foreground">A small local grower led by {product.farmerName}.</p></div><div className="flex items-center gap-2 text-sm font-semibold"><MapPin className="size-4 text-primary" /> {product.location} · {product.distanceKm} km</div></div></div>
        <CardContent className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
          <div className="flex gap-3"><Sprout className="size-5 text-primary" /><div><p className="font-bold">Local growing</p><p className="mt-1 text-sm text-muted-foreground">Produce is listed from {product.location}.</p></div></div>
          <div className="flex gap-3"><Star className="size-5 text-primary" /><div><p className="font-bold">Community rating</p><p className="mt-1 text-sm text-muted-foreground">{product.rating} sample rating for this listing.</p></div></div>
          <div className="flex gap-3"><Sprout className="size-5 text-primary" /><div><p className="font-bold">Demand-led harvest</p><p className="mt-1 text-sm text-muted-foreground">Local interest can help farmers plan what to pick.</p></div></div>
        </CardContent>
      </Card>
      <section className="mt-10"><div className="mb-5"><h2 className="text-2xl font-extrabold">From this farm</h2><p className="mt-1 text-sm text-muted-foreground">Sample listings associated with {product.farmName}.</p></div>
        {farmProducts.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{farmProducts.map((entry) => <ProductCard key={entry.id} product={entry} />)}</div> : <p className="text-sm text-muted-foreground" data-testid="empty-farm-products">No sample listings are shown for this farm.</p>}
      </section>
    </main>
  );
}
