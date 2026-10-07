---
name: FarmFlow data boundaries
description: Product-level constraints for backend selection and demo behavior.
---

FarmFlow's production backend must be Supabase. Do not substitute Replit
PostgreSQL or another backend. Until Supabase is configured, sample records and
tab-local cart state may support an explicitly labeled preview, but the UI must
not imply that authentication, reservations, orders, payments, or harvest-plan
saves succeeded.

**Why:** The project brief requires Supabase as the only backend and explicitly
forbids fake success or persistence claims.

**How to apply:** Before implementing production data flows, inspect the
connected Supabase schema and policies. Keep sensitive operations secured in
Supabase; never put a service-role key in the client.
