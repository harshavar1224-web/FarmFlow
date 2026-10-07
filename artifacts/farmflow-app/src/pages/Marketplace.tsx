import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Input } from "@workspace/farmflow-design-system/components/ui/input";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { useMarketplaceProducts } from "@/features/farmflow/hooks";

const CATEGORIES = ["All", "Vegetables", "Greens", "Fruits"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const products = useMarketplaceProducts({ search, category });
  return (
    <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-3xl">
        <Badge variant="secondary">The local harvest, shaped by demand</Badge>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Fresh from farms near you.</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse sample produce from nearby growers. Explore now; real reservations are not available in this demo.</p>
      </div>
      <div className="mt-8 grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <label className="relative block">
          <span className="sr-only">Search produce, farm, or location</span>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search produce, farm, or location" className="pl-9" data-testid="input-marketplace-search" />
        </label>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category" data-testid="filters-product-category">
          <SlidersHorizontal className="mr-1 size-4 text-muted-foreground" aria-hidden="true" />
          {CATEGORIES.map((item) => <Button key={item} type="button" size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)} data-testid={`filter-category-${item.toLowerCase()}`}>{item}</Button>)}
        </div>
      </div>
      <div className="mb-4 mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">Available sample produce</h2>
        {!products.isLoading && !products.isError && <span className="text-sm text-muted-foreground" data-testid="text-marketplace-count">{products.data?.length ?? 0} items</span>}
      </div>
      {products.isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div className="h-80 animate-pulse rounded-xl bg-muted" /><div className="h-80 animate-pulse rounded-xl bg-muted" /><div className="h-80 animate-pulse rounded-xl bg-muted" /></div> :
        products.isError ? <Card><CardContent className="flex flex-col items-start gap-3 p-6" data-testid="error-marketplace"><p className="font-semibold">Sample produce could not be loaded.</p><p className="text-sm text-muted-foreground">Try loading the demo list again.</p><Button onClick={() => void products.refetch()} data-testid="button-retry-marketplace">Try again</Button></CardContent></Card> :
          products.data?.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.data.map((product) => <ProductCard key={product.id} product={product} />)}</div> :
            <Card data-testid="empty-marketplace"><CardContent className="flex flex-col items-center p-10 text-center"><div className="rounded-full bg-secondary p-4"><Search className="size-6 text-primary" /></div><h3 className="mt-4 text-lg font-bold">No produce found</h3><p className="mt-1 max-w-sm text-sm text-muted-foreground">Try another search or choose a different category.</p><Button variant="outline" className="mt-5" onClick={() => { setSearch(""); setCategory("All"); }} data-testid="button-clear-marketplace-filters">Clear filters</Button></CardContent></Card>}
    </main>
  );
}
