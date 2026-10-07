import { Link } from "wouter";
import { ArrowRight, Check, Leaf, MapPin, Sprout, TrendingUp } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { useMarketplaceProducts, useHarvestIntelligence } from "@/features/farmflow/hooks";

export default function Home() {
  const products = useMarketplaceProducts();
  const harvest = useHarvestIntelligence();
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-5"><Sprout className="mr-1 size-3.5" /> A local food network</Badge>
          <h1 data-testid="heading-home-promise" className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Demand before <span className="text-primary">harvest.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Choose what you want fresh from nearby farms. Farmers see local demand first, then plan what to pick.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/marketplace" data-testid="button-explore-marketplace">Explore local produce <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/farmer/forecast" data-testid="button-view-forecast">See the farmer forecast</Link></Button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t pt-6">
            <div><p className="text-2xl font-extrabold">Nearby</p><p className="mt-1 text-xs text-muted-foreground">Small farms</p></div>
            <div><p className="text-2xl font-extrabold">Pre-orders</p><p className="mt-1 text-xs text-muted-foreground">Demand signals</p></div>
            <div><p className="text-2xl font-extrabold">Fresh</p><p className="mt-1 text-xs text-muted-foreground">Picked locally</p></div>
          </div>
        </div>
        <Card className="overflow-hidden rounded-2xl border-primary/10 bg-secondary/60">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-bold">FarmFlow Harvest Intelligence</p><p className="mt-1 text-xs text-muted-foreground">Illustrative tomato recommendation</p></div>
              <Badge variant="outline">Demo forecast</Badge>
            </div>
            {harvest.isLoading ? <div className="mt-8 h-32 animate-pulse rounded-xl bg-muted" data-testid="loading-home-forecast" /> :
            harvest.isError ? <div className="mt-6"><p className="text-sm text-destructive" data-testid="error-home-forecast">Forecast could not be loaded.</p><Button variant="outline" size="sm" className="mt-3" onClick={() => void harvest.refetch()} data-testid="button-retry-home-forecast">Try again</Button></div> :
                harvest.data && <div className="mt-7">
                  <div className="flex items-end justify-between gap-4">
                    <div><p className="text-sm text-muted-foreground">{harvest.data.productName} · {harvest.data.harvestDate}</p><p className="mt-1 text-5xl font-extrabold text-primary" data-testid="text-home-recommendation">{harvest.data.recommendedHarvestKg}<span className="ml-1 text-xl">kg</span></p><p className="text-sm text-muted-foreground">Suggested harvest</p></div>
                    <div className="rounded-xl bg-background p-4 text-center"><p className="text-2xl font-bold">{harvest.data.confidencePercent}%</p><p className="text-xs text-muted-foreground">confidence</p></div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-background p-3"><p className="text-xs text-muted-foreground">Pre-orders</p><p className="mt-1 font-bold">{harvest.data.preorderDemandKg} kg</p></div>
                    <div className="rounded-lg bg-background p-3"><p className="text-xs text-muted-foreground">Predicted demand</p><p className="mt-1 font-bold">{harvest.data.predictedDemandKg} kg</p></div>
                  </div>
                  <Link href="/farmer/forecast" data-testid="link-home-forecast" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">How the forecast works <ArrowRight className="size-4" /></Link>
                </div>}
            <div className="mt-7 flex items-center gap-2 border-t pt-5 text-xs text-muted-foreground"><Check className="size-4 text-primary" /> Local demand informs a considered harvest.</div>
          </CardContent>
        </Card>
      </section>
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[{ icon: Leaf, title: "Fresh from nearby farms", body: "Know who grew your food and where it comes from." }, { icon: TrendingUp, title: "Demand comes first", body: "Pre-orders help small farms understand what people want." }, { icon: MapPin, title: "Rooted in your area", body: "A shorter distance between harvest and your table." }].map(({ icon: Icon, title, body }) => <div key={title} className="flex gap-3"><Icon className="mt-1 size-5 shrink-0 text-primary" /><div><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{body}</p></div></div>)}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-wide text-primary">From nearby growers</p><h2 className="mt-2 text-3xl font-extrabold">Fresh, with a farm behind it.</h2></div>
          <Button asChild variant="outline" className="hidden sm:inline-flex"><Link href="/marketplace" data-testid="button-home-all-products">See all produce <ArrowRight /></Link></Button>
        </div>
        {products.isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div className="h-80 animate-pulse rounded-xl bg-muted" /><div className="h-80 animate-pulse rounded-xl bg-muted" /><div className="h-80 animate-pulse rounded-xl bg-muted" /></div> :
          products.isError ? <Card><CardContent className="p-6" data-testid="error-home-products"><p className="text-sm text-destructive">We could not load the sample produce right now.</p><Button variant="outline" size="sm" className="mt-3" onClick={() => void products.refetch()} data-testid="button-retry-home-products">Try again</Button></CardContent></Card> :
            products.data?.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.data.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div> :
              <div className="rounded-xl border p-8 text-center text-muted-foreground" data-testid="empty-home-products">No sample products are available.</div>}
      </section>
    </main>
  );
}
