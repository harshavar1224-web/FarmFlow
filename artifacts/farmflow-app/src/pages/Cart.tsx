import { Link } from "wouter";
import { ArrowRight, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "@workspace/farmflow-design-system/components/ui/button";
import { Card, CardContent } from "@workspace/farmflow-design-system/components/ui/card";
import { Badge } from "@workspace/farmflow-design-system/components/ui/badge";
import { useFarmFlowCart } from "@/features/farmflow/cart-context";
import { DEMO_PRODUCTS } from "@/features/farmflow/demo-data";

export default function Cart() {
  const cart = useFarmFlowCart();
  const lines = cart.items.map((line) => ({ ...line, product: DEMO_PRODUCTS.find((product) => product.id === line.productId) })).filter((line) => line.product);
  return (
    <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><Badge variant="secondary">Tab-local demo cart</Badge><h1 className="mt-3 text-4xl font-extrabold">Your basket</h1><p className="mt-2 text-muted-foreground">A temporary list held only in this browser tab. No reservation or order is created.</p></div>
        {lines.length > 0 && <Button variant="outline" onClick={cart.clearCart} data-testid="button-clear-cart"><Trash2 /> Clear cart</Button>}
      </div>
      {lines.length === 0 ? <Card className="mt-8" data-testid="empty-cart"><CardContent className="flex flex-col items-center p-10 text-center"><div className="rounded-full bg-secondary p-4"><ShoppingBasket className="size-6 text-primary" /></div><h2 className="mt-4 text-xl font-bold">Your demo cart is empty</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">Explore local sample produce and add items to see an indicative basket total.</p><Button asChild className="mt-5"><Link href="/marketplace" data-testid="button-cart-browse">Browse the marketplace <ArrowRight /></Link></Button></CardContent></Card> :
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-3">
            {lines.map(({ product, quantity }) => product && <Card key={product.id} data-testid={`row-cart-${product.id}`}><CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4"><div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-extrabold text-primary">{product.name.split(" ").map((word) => word[0]).join("")}</div><div className="min-w-0"><Link href={`/product/${product.id}`} data-testid={`link-cart-product-${product.id}`} className="font-bold hover:text-primary">{product.name}</Link><p className="mt-1 text-sm text-muted-foreground">{product.farmName} · ₹{product.priceRupees} / {product.unit}</p></div></div>
              <div className="flex items-center justify-between gap-4 sm:justify-end"><div className="flex items-center gap-1 rounded-md border p-1"><Button variant="ghost" size="icon" aria-label={`Decrease ${product.name} quantity`} onClick={() => cart.setQuantity(product.id, quantity - 1)} data-testid={`button-quantity-minus-${product.id}`}><Minus /></Button><span className="min-w-8 text-center text-sm font-bold" data-testid={`text-cart-quantity-${product.id}`}>{quantity}</span><Button variant="ghost" size="icon" aria-label={`Increase ${product.name} quantity`} disabled={quantity >= product.availableQuantity} onClick={() => cart.setQuantity(product.id, quantity + 1)} data-testid={`button-quantity-plus-${product.id}`}><Plus /></Button></div><p className="min-w-20 text-right font-bold">₹{product.priceRupees * quantity}</p><Button variant="ghost" size="icon" aria-label={`Remove ${product.name}`} onClick={() => cart.removeItem(product.id)} data-testid={`button-remove-${product.id}`}><Trash2 /></Button></div>
            </CardContent></Card>)}
          </div>
          <Card className="h-fit rounded-xl"><CardContent className="p-5"><h2 className="text-lg font-bold">Cart summary</h2><div className="mt-5 flex justify-between text-sm"><span>Items</span><span data-testid="text-cart-item-count">{cart.itemCount}</span></div><div className="mt-3 flex justify-between border-t pt-4"><span className="font-semibold">Indicative subtotal</span><span className="font-extrabold" data-testid="text-cart-subtotal">₹{cart.subtotalRupees}</span></div><Button className="mt-5 w-full" disabled data-testid="button-checkout-unavailable">Checkout unavailable</Button><p className="mt-3 text-xs leading-5 text-muted-foreground" data-testid="text-checkout-unavailable">Checkout, reservation, and payment are not connected in demo mode. Your cart is not an order.</p><Button asChild variant="link" className="mt-3 h-auto p-0"><Link href="/marketplace" data-testid="link-cart-continue">Continue browsing</Link></Button></CardContent></Card>
        </div>}
    </main>
  );
}
