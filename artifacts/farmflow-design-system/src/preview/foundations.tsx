import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import logoUrl from '../../docs/references/logos/farmflow-logo.png';
import { Guidelines } from './parts';

const CORE_SWATCHES = [
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'border bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Muted', className: 'bg-muted' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
  { name: 'Destructive', className: 'bg-destructive' },
  { name: 'Card', className: 'border bg-card' },
  { name: 'Border', className: 'bg-border' },
] as const;

const CHART_SWATCHES = [
  { name: 'Series 1 · Supply', className: 'bg-chart-1' },
  { name: 'Series 2 · Demand', className: 'bg-chart-2' },
  { name: 'Series 3 · Surplus', className: 'bg-chart-3' },
  { name: 'Series 4 · Logistics', className: 'bg-chart-4' },
  { name: 'Series 5 · Impact', className: 'bg-chart-5' },
] as const;

const TYPE_SCALE = [
  { label: 'Display', className: 'text-4xl font-bold' },
  { label: 'Heading', className: 'text-2xl font-semibold' },
  { label: 'Body', className: 'text-base' },
  { label: 'Label', className: 'text-sm font-medium' },
  { label: 'Caption', className: 'text-sm text-muted-foreground' },
] as const;

const SPACING_SCALE = [
  { label: '4', className: 'w-4' },
  { label: '8', className: 'w-8' },
  { label: '12', className: 'w-12' },
  { label: '16', className: 'w-16' },
  { label: '24', className: 'w-24' },
] as const;

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <Badge className="w-fit">FarmFlow Harvest Intelligence</Badge>
            <CardTitle className="pt-1 text-2xl">Tomorrow’s harvest plan</CardTitle>
            <CardDescription>
              Demand signals help farmers plan the right amount before harvest.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Predicted demand', value: '82 kg' },
                { label: 'Pre-orders', value: '61 kg' },
                { label: 'Recommended', value: '86 kg' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl bg-secondary p-3">
                  <p className="text-xs leading-5 text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xl font-bold tracking-tight">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="secondary">89% confidence</Badge>
              <span className="text-muted-foreground">
                Recent orders and pre-orders are increasing.
              </span>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button>Review harvest plan</Button>
            <Button variant="outline">See demand signals</Button>
          </CardFooter>
        </Card>

        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Core palette
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {CORE_SWATCHES.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
          <div className="mt-6 border-t pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Type in use
            </h3>
            <p className="mt-3 text-2xl font-bold tracking-tight">
              Fresh from farms near you.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Clear, warm language makes local food and harvest timing easy to understand.
            </p>
          </div>
        </section>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground">
        <div>
          <h2 className="font-semibold">Component foundations</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Reusable actions and status cues, composed from the shared tokens.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Explore produce</Button>
          <Button variant="secondary">Pre-order</Button>
          <Button variant="outline">View farm</Button>
          <Button variant="ghost">More details</Button>
          <Badge>Harvesting tomorrow</Badge>
          <Badge variant="secondary">Verified farm</Badge>
          <Badge variant="outline">Limited</Badge>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold">Demand before harvest</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Put pre-orders and forecast context beside the harvest recommendation.
            Keep the reason for each recommendation visible.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold">Fresh food, clear details</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use clear harvest dates, quantities, farm attribution, and delivery
            expectations wherever a customer makes a decision.
          </p>
        </div>
      </section>
    </div>
  );
}

export function BrandLogoPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border bg-card p-5 text-card-foreground sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Supplied brand asset
        </p>
        <div className="mt-5 flex min-h-72 items-center justify-center rounded-xl border bg-white p-6">
          <img
            src={logoUrl}
            alt="FarmFlow logo with the tagline Know the demand. Plan the harvest. Sell fresh. Waste less."
            className="h-auto w-full max-w-2xl"
          />
        </div>
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium">Asset:</span>{' '}
            <span className="text-muted-foreground">farmflow-logo.png</span>
          </p>
          <p>
            <span className="font-medium">Original dimensions:</span>{' '}
            <span className="text-muted-foreground">1536 × 1024 px</span>
          </p>
          <p className="sm:col-span-2 text-muted-foreground">
            The source image has a light background and includes the full logo
            lockup and tagline.
          </p>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Brand colors</h2>
          <p className="text-sm text-muted-foreground">
            The core roles used for emphasis, supporting actions, and accents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <div>
          <h2 className="font-semibold">Data visualization</h2>
          <p className="text-sm text-muted-foreground">
            On-brand series colors for supply, demand, surplus, logistics, and impact.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {CHART_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Semantic and surface colors</h2>
          <p className="text-sm text-muted-foreground">
            Roles for text, backgrounds, borders, muted content, and danger.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="font-semibold">Color usage</h2>
        <Guidelines
          items={[
            { kind: 'do', text: 'Use forest green for primary actions and positive states.' },
            { kind: 'do', text: 'Reserve muted gold for selective premium or harvest highlights.' },
            { kind: 'dont', text: 'Do not use bright green as a large, dominant surface.' },
            { kind: 'dont', text: 'Avoid an overly colorful agricultural palette.' },
          ]}
        />
      </section>
    </div>
  );
}

export function ContentGuidelinesPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          FarmFlow promise
        </p>
        <p className="mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          Know the demand. Plan the harvest. Sell fresh. Waste less.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Make the demand-led model easy to understand: consumers pre-order,
          farmers plan the harvest, and local supply is coordinated around need.
        </p>
      </section>
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="font-semibold">Voice and tone</h2>
        <Guidelines
          items={[
            { kind: 'do', text: 'Lead with “Demand before harvest” when explaining what makes FarmFlow different.' },
            { kind: 'do', text: 'Name the feature “FarmFlow Harvest Intelligence” and explain what signals drive its recommendations.' },
            { kind: 'do', text: 'Use straightforward language about freshness, timing, farmer earnings, and delivery.' },
            { kind: 'dont', text: 'Do not present transparent, deterministic forecasts as scientific certainty.' },
            { kind: 'dont', text: 'Do not reduce the product story to a generic marketplace or simply call the feature “AI”.' },
          ]}
        />
      </section>
    </div>
  );
}

export function MotionGuidelinesPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border bg-card p-6">
        <h2 className="font-semibold">Motion should clarify change</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Use movement to make demand flow, status changes, and action feedback
          easier to follow. Keep the interface calm and focused.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Subtle', detail: 'Support the content, not compete with it.' },
            { label: 'Fast', detail: 'Keep everyday interactions responsive.' },
            { label: 'Purposeful', detail: 'Connect the motion to a state or decision.' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-secondary p-4">
              <p className="font-semibold">{item.label}</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-xl border bg-card p-6">
        <h2 className="font-semibold">Motion guidelines</h2>
        <Guidelines
          items={[
            { kind: 'do', text: 'Use subtle, quick transitions for hover, focus, and status feedback.' },
            { kind: 'do', text: 'Use flow animation only when it explains the relationship between demand and harvest.' },
            { kind: 'dont', text: 'Never over-animate or make essential information depend on motion.' },
          ]}
        />
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Manrope · UI and body
        </h2>
        <p className="mt-4 text-4xl font-bold">The quick brown fox</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Manrope is the default typeface across the FarmFlow interface.
        </p>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[88px_1fr]">
            <span className="pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={entry.className}>Build products people understand.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-8 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div className={`h-3 rounded-full bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corner treatments derive from the base radius token.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Small', className: 'rounded-sm' },
            { label: 'Medium', className: 'rounded-md' },
            { label: 'Large', className: 'rounded-lg' },
            { label: 'Extra large', className: 'rounded-xl' },
          ].map((radius) => (
            <div
              key={radius.label}
              className={`flex h-24 items-end border bg-muted p-3 ${radius.className}`}
            >
              <span className="text-xs font-medium">{radius.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4 rounded-xl border bg-card p-6 text-card-foreground lg:col-span-2">
        <div>
          <h2 className="font-semibold">Surface and hierarchy</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use space and restrained elevation to make harvest and marketplace information easy to scan.
          </p>
        </div>
        <Guidelines
          items={[
            { kind: 'do', text: 'Use generous whitespace, subtle borders, and restrained shadows.' },
            { kind: 'do', text: 'Keep product and dashboard typography comfortable, with compact data labels where needed.' },
            { kind: 'do', text: 'Use 16–24px corners on major cards and composed surfaces.' },
          ]}
        />
      </section>
    </div>
  );
}
