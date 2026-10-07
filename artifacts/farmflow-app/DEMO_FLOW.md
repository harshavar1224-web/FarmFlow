# FarmFlow demo flow

## What the preview demonstrates

1. Start on the FarmFlow promise: demand before harvest.
2. Browse nearby sample produce, search and filter the catalog.
3. Open a product and its farm profile to review freshness, harvest timing,
   distance, price, and sample availability.
4. Add items to a same-tab demo cart and review the quantities and subtotal.
5. Open the farmer forecast view and inspect the tomato demand recommendation
   and its stated signals.

## What the preview does not do

- It does not authenticate a user or persist profile data.
- Adding an item to the cart does not reserve inventory.
- Checkout, payment, order creation, and harvest-plan acceptance are not live.
- The tomato forecast is illustrative demo data, not a live prediction.
- Refreshing the page clears the in-memory cart.

The UI must keep a visible “Demo environment” label and explain when a real
Supabase-backed action is unavailable. Never display a success state for a
mutation that did not reach and succeed in Supabase.
