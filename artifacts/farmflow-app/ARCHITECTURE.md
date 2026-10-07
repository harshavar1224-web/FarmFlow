# FarmFlow architecture

## Current implementation

- Web client: React, TypeScript, Vite, Wouter, and TanStack Query.
- Shared UI: `@workspace/farmflow-design-system`; its tokens and components are
  the only visual source of truth.
- Current preview data: a small in-memory dataset in the app, explicitly
  labeled as demo data. Cart state lives only for the current tab session.
- Backend: Supabase is the only intended production backend. Development
  connection values are present but have not passed validation; the preview
  remains demo-only.

## Required production architecture

```text
FarmFlow React client
        |
        +-- Supabase Auth
        +-- Supabase Postgres with RLS
        +-- Supabase Storage
        +-- Supabase Realtime
        +-- secure Postgres functions / Supabase Edge Functions
```

The generic Replit API server and Drizzle/Postgres scaffolding are not part of
FarmFlow's data path. Do not use the Replit-managed database as a fallback.

## Trust boundaries

- The browser may use only the Supabase URL and public anon/publishable key.
- A service-role key must never be bundled into the client.
- Roles and ownership must be checked in Supabase policies/functions, not
  trusted from browser state.
- Forecasts must be described as deterministic and explainable unless a real
  model is added and validated.
- Demo actions must not report that a real order, payment, reservation, or
  harvest plan was saved.

## Connection status

The configured URL includes a path segment, which caused API-route 404s. At the
host origin, the Supabase REST API rejected the supplied key. No remote schema
was exposed. Do not create or run migrations until the URL/key pair is corrected
and the target project's existing schema and policies have been inspected.
