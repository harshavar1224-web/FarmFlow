# FarmFlow database

## Current state

No Supabase client configuration or migration files were present during the
workspace audit, and no Supabase integration is connected. The generic
`lib/db` package targets Replit-managed PostgreSQL; FarmFlow must not use it.
No schema has been created, applied, or verified.

## Target

Supabase PostgreSQL is the only production database. Before adding a migration:

1. Connect the intended Supabase project.
2. Inspect its current tables, functions, triggers, indexes, and RLS policies.
3. Reconcile existing schema with the FarmFlow requirements.
4. Write an additive migration; do not duplicate existing objects.
5. Verify every sensitive table has RLS and that role/ownership checks are
   enforced outside the browser.

## Planned core data areas

The supplied product brief identifies profiles, farms, products, inventory,
orders and order history, demand forecasts, harvest plans, notifications,
reviews, delivery clusters, and audit records. Exact columns, constraints,
policies, and relationships remain unverified until the Supabase project is
connected.

## Operations that require secure database logic

- Reserve and release inventory atomically.
- Create idempotent orders and enforce allowed order-state transitions.
- Record status history and audit events.
- Restrict farmer, consumer, and admin access through RLS and secure role
  claims.
- Save harvest plans only for the authenticated farm owner.

Do not substitute browser storage, Replit Postgres, or demo state for these
production operations.
