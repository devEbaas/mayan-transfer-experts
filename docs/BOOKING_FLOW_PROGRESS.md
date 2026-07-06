# Booking Flow — PRD Progress

Snapshot of how the wizard maps to `Transportation Booking Flow PRD`. Updated as work lands — treat this as current state, not a historical log.

Legend: ✅ done · 🚧 partial / local-only · ⛔ blocked on backend

## Paso 1 — Datos del transporte
- ✅ Trip type, origin/destination pickers sourced from `GET /routes` (real catalog, not hardcoded)
- ✅ Airport↔hotel pairing enforced structurally (destination options filter by `isAirport`) + as a Zod guard
- ✅ Arrival/return date + time, adults/children, all validated with Zod (`src/schemas/booking.ts`) before advancing
- 🚧 A single `arrivalTime`/`departureTime` is captured once in Step 1 and reused as the flight time in Step 4 — the backend DTO only has one time slot per leg, so there's no separate "flight ETA" field

## Paso 2 — Selección del vehículo
- ✅ Vehicles + prices from `GET /vehicles?originId&destinationId` (`src/hooks/useVehicles.ts`)
- ✅ Filtered client-side to `capacityPassengers >= adults + children`
- ⛔ Amenities checklist is static/cosmetic (`src/data/vehicleFeatures.ts`) — the `VehicleRateEntity` has no amenities field yet

## Paso 3 — Extras
- 🚧 UI fully functional (`ExtrasStep.tsx`, `src/data/extrasCatalog.ts`) — qty steppers, running subtotal, shown in the summary
- ⛔ Catalog is local/static and the subtotal is **not sent to `POST /bookings`** — no extras/products catalog or booking line-items on the backend yet

## Paso 4 — Datos del contacto
- ✅ Name, email + confirm-email match, phone, contact preference — all Zod-validated
- ✅ Flight fields (airline, flight no.) only required for the leg that actually touches the airport, derived from `Place.isAirport`
- 🚧 `country`/`hotel` are collected but have no columns on `CreateBookingDto` — folded into the free-text `comments` field on submit so the data isn't lost

## Resumen + Pago
- ✅ Summary reads live trip/vehicle/extras/contact state, no hardcoded values
- ⛔ Promo code input removed for this pass — no `/promo/validate` endpoint exists
- ✅ Currency: shows whatever `currency` the backend returns; the old client-side FX table was removed (frontend never converts)
- ⛔ PayPal hidden — only `payments/stripe/*` exists server-side; `payMethod` is fixed to `'card'`
- ✅ Payment: `POST /bookings` (creates a `pending` booking) → `POST /payments/stripe/intent` → Stripe `PaymentElement` confirms client-side → `DoneStep` shows the real `folio`
- ✅ No partial bookings: the booking is only created once, at the moment "Pagar ahora" is pressed, not while browsing earlier steps
- ✅ Retry-safe: `bookingId` is cached in the store so a failed payment retries against the same booking instead of creating a duplicate

## Persistencia
- ✅ Zustand `persist` middleware → `localStorage` (`mte-booking`), all form state auto-saved on every change, no save button
- ✅ 24h expiry (`BOOKING_TTL_MS`) checked at app boot; expired state is cleared silently
- ✅ Resume prompt (`ResumeBookingPrompt.tsx`) offers Continue / Start over when there's in-progress state on load
- ✅ Successful booking flow ends with `reset()`, which overwrites the persisted state back to defaults

## Known backend follow-ups (out of scope for this frontend pass)
- `/promo/validate` endpoint for promo codes
- Extras/products catalog + booking line-items so extras are actually billed
- Amenities field on `VehicleRateEntity`
- `country`/`hotel` columns on `Booking` (currently bridged via `comments`)
- PayPal payment integration (only Stripe exists today)
- Multi-currency FX support (rates are single-currency today; the frontend intentionally does not convert)
