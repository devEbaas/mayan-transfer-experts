import { z } from 'zod';
import type { Place } from '@/types/booking';

/**
 * Error messages are i18n keys (not literal text) so components can translate them
 * with `t(issue.message)` regardless of the active language.
 */

const baseTripSchema = z.object({
  tripType: z.enum(['round', 'oneway']),
  originId: z.string().min(1, 'err_originRequired'),
  destinationId: z.string().min(1, 'err_destinationRequired'),
  arrivalDate: z.string().min(1, 'err_dateRequired'),
  arrivalTime: z.string().min(1, 'err_timeRequired'),
  departureDate: z.string(),
  departureTime: z.string(),
  adults: z.number().min(1, 'err_adultsMin'),
  children: z.number().min(0),
});

export type TripFormInput = z.infer<typeof baseTripSchema>;

/** Places are passed in so the airport/hotel pairing rule can be enforced without a redundant API call. */
export function createTripSchema(places: Place[]) {
  return baseTripSchema.superRefine((data, ctx) => {
    if (data.originId && data.destinationId && data.originId === data.destinationId) {
      ctx.addIssue({ code: 'custom', message: 'err_sameLocation', path: ['destinationId'] });
    }

    const origin = places.find((p) => p.id === data.originId);
    const destination = places.find((p) => p.id === data.destinationId);
    if (origin && destination && origin.isAirport === destination.isAirport) {
      ctx.addIssue({ code: 'custom', message: 'err_airportPairing', path: ['destinationId'] });
    }

    if (data.arrivalDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(data.arrivalDate) < today) {
        ctx.addIssue({ code: 'custom', message: 'err_datePast', path: ['arrivalDate'] });
      }
    }

    if (data.tripType === 'round') {
      if (!data.departureDate) {
        ctx.addIssue({ code: 'custom', message: 'err_returnDateRequired', path: ['departureDate'] });
      } else if (data.arrivalDate && data.departureDate <= data.arrivalDate) {
        ctx.addIssue({ code: 'custom', message: 'err_returnBeforeArrival', path: ['departureDate'] });
      }
      if (!data.departureTime) {
        ctx.addIssue({ code: 'custom', message: 'err_timeRequired', path: ['departureTime'] });
      }
    }
  });
}

export const customerSchema = z
  .object({
    firstName: z.string().min(1, 'err_nameRequired'),
    lastName: z.string().min(1, 'err_nameRequired'),
    email: z.string().min(1, 'err_required').email('err_emailInvalid'),
    confirmEmail: z.string().min(1, 'err_required').email('err_emailInvalid'),
    phone: z.string().min(6, 'err_phoneRequired'),
    country: z.string().min(1, 'err_required'),
    hotel: z.string().min(1, 'err_required'),
    comments: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({ code: 'custom', message: 'err_emailMismatch', path: ['confirmEmail'] });
    }
  });

export type CustomerFormInput = z.infer<typeof customerSchema>;

const baseFlightSchema = z.object({
  arrivalAirline: z.string(),
  arrivalFlightNo: z.string(),
  departureAirline: z.string(),
  departureFlightNo: z.string(),
});

/** Airline/flight-number are only required for the legs that actually touch the airport. */
export function createFlightSchema(requireArrival: boolean, requireDeparture: boolean) {
  return baseFlightSchema.superRefine((data, ctx) => {
    if (requireArrival) {
      if (!data.arrivalAirline) {
        ctx.addIssue({ code: 'custom', message: 'err_flightAirline', path: ['arrivalAirline'] });
      }
      if (!data.arrivalFlightNo) {
        ctx.addIssue({ code: 'custom', message: 'err_flightNo', path: ['arrivalFlightNo'] });
      }
    }
    if (requireDeparture) {
      if (!data.departureAirline) {
        ctx.addIssue({ code: 'custom', message: 'err_flightAirline', path: ['departureAirline'] });
      }
      if (!data.departureFlightNo) {
        ctx.addIssue({ code: 'custom', message: 'err_flightNo', path: ['departureFlightNo'] });
      }
    }
  });
}

interface SafeParseFailure {
  success: false;
  error: { issues: { path: PropertyKey[]; message: string }[] };
}
interface SafeParseSuccess {
  success: true;
}

export function firstIssueByPath(
  result: SafeParseSuccess | SafeParseFailure,
): Record<string, string> {
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.map(String).join('.');
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
