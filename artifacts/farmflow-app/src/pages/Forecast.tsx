import { Link } from "wouter";
import { ArrowRight, CalendarDays, ChartNoAxesCombined, CircleHelp, Leaf, LockKeyhole, TrendingUp } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { Progress } from "@workspace/farmflow-design-system/components/ui/progress";
import { useHarvestIntelligence } from "@/features/farmflow/hooks";

export default function Forecast() {
  const forecast = useHarvestIntelligence();
  if (forecast.isLoading) return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="h-80 animate-pulse rounded-xl bg-muted" data-testid="loading-forecast" /></main>;
  if (forecast.isError) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="error-forecast"><h1 className="text-2xl font-bold">Forecast unavailable</h1><p className="mt-2 text-muted-foreground">We could not load the sample recommendation.</p><Button className="mt-5" onClick={() => void forecast.refetch()} data-testid="button-retry-forecast">Try again</Button></main>;
  const data = forecast.data;
  if (!data) return <main className="mx-auto max-w-3xl px-4 py-16 text-center" data-testid="empty-forecast"><h1 className="text-2xl font-bold">No sample forecast available</h1></main>;
  const demandTotal = Math.max(data.predictedDemandKg, data.recommendedHarvestKg, 1);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 max-w-3xl"><Badge variant="secondary"><ChartNoAxesCombined className="mr-1 size-4" /> Farmer planning view</Badge><h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">FarmFlow Harvest Intelligence</h1><p className="mt-4 text-lg leading-7 text-muted-foreground">Demand before harvest: a sample recommendation showing how pre-orders and local signals can inform a farmer’s plan.</p></div>
      <Card className="overflow-hidden rounded-2xl">
        <div className="flex flex-col justify-between gap-6 bg-secondary/70 p-6 sm:flex-row sm:items-end sm:p-8"><div><p className="text-sm font-bold uppercase tracking-wide text-primary">Harvest recommendation · sample data</p><h2 className="mt-3 text-3xl font-extrabold">{data.productName}</h2><p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /> {data.harvestDate}</p></div><div className="flex items-end gap-5"><div><p className="text-5xl font-extrabold text-primary" data-testid="text-recommended-harvest">{data.recommendedHarvestKg}<span className="ml-1 text-xl">kg</span></p><p className="mt-1 text-sm text-muted-foreground">Recommended harvest</p></div><div className="rounded-xl bg-background px-4 py-3"><p className="text-2xl font-extrabold" data-testid="text-forecast-confidence">{data.confidencePercent}%</p><p className="text-xs text-muted-foreground">confidence</p></div></div></div>
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{ title: "Predicted demand", value: `${data.predictedDemandKg} kg`, note: "Sample estimate" }, { title: "Pre-order demand", value: `${data.preorderDemandKg} kg`, note: "Interest already recorded" }, { title: "Current stock", value: `${data.currentStockKg} kg`, note: "Sample stock figure" }, { title: "Potential surplus", value: `${data.potentialSurplusKg} kg`, note: "Planning estimate" }].map((metric) => <div key={metric.title} className="rounded-lg border bg-background p-4"><p className="text-sm text-muted-foreground">{metric.title}</p><p className="mt-2 text-2xl font-extrabold" data-testid={`metric-${metric.title.toLowerCase().replaceAll(" ", "-")}`}>{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.note}</p></div>)}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <section><div className="flex items-center gap-2"><TrendingUp className="size-5 text-primary" /><h3 className="text-lg font-bold">Demand and harvest, side by side</h3></div><p className="mt-1 text-sm text-muted-foreground">This sample recommendation includes a modest buffer above predicted demand.</p><div className="mt-5 space-y-5">
              {[{ label: "Pre-order demand", value: data.preorderDemandKg }, { label: "Predicted demand", value: data.predictedDemandKg }, { label: "Recommended harvest", value: data.recommendedHarvestKg }].map((item) => <div key={item.label}><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{item.label}</span><span>{item.value} kg</span></div><Progress value={Math.min(100, item.value / demandTotal * 100)} data-testid={`progress-${item.label.toLowerCase().replaceAll(" ", "-")}`} /></div>)}
            </div></section>
            <section><h3 className="text-lg font-bold">Signals behind the suggestion</h3><p className="mt-1 text-sm text-muted-foreground">A transparent view of the sample factors considered.</p><div className="mt-4 space-y-3">{data.signals.map((signal) => <div key={signal.label} className="flex items-center justify-between rounded-lg border p-3" data-testid={`signal-${signal.label.toLowerCase().replaceAll(" ", "-")}`}><span className="flex items-center gap-2 text-sm font-semibold"><Leaf className="size-4 text-primary" />{signal.label}</span><Badge variant="secondary">{signal.contribution}</Badge></div>)}</div></section>
          </div>
          <div className="mt-8 flex gap-3 rounded-lg border bg-muted/40 p-4"><CircleHelp className="mt-0.5 size-5 shrink-0 text-primary" /><p className="text-sm leading-6 text-muted-foreground" data-testid="text-forecast-explanation">{data.explanation} Confidence is an estimate, not a guarantee; conditions and farmer judgment matter.</p></div>
          <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><LockKeyhole className="mt-0.5 size-5 text-muted-foreground" /><div><p className="font-bold">Planning action unavailable</p><p className="mt-1 text-sm text-muted-foreground" data-testid="text-plan-save-unavailable">This is illustrative demo data. No plan can be accepted or saved.</p></div></div><Button disabled data-testid="button-save-plan-unavailable">Save harvest plan</Button></div>
        </CardContent>
      </Card>
      <div className="mt-6"><Button asChild variant="outline"><Link href="/marketplace" data-testid="link-forecast-marketplace">See local produce <ArrowRight /></Link></Button></div>
    </main>
  );
}
