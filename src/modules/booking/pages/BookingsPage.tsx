import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockBookings, mockGuides, mockPlaces } from '@/shared/lib/mockData';

function statusLabel(status: 'confirmed' | 'pending') {
  return status === 'confirmed' ? 'Confirmee' : 'En attente';
}

function statusClass(status: 'confirmed' | 'pending') {
  return status === 'confirmed' ? 'bg-guide/10 text-guide' : 'bg-accent-light text-accent';
}

export default function BookingsPage() {
  const bookings = mockBookings
    .map((booking) => {
      const place = mockPlaces.find((p) => p.id === booking.placeId);
      const guide = mockGuides.find((g) => g.id === booking.guideId);
      if (!place || !guide) return null;
      return { booking, place, guide };
    })
    .filter(Boolean) as Array<{
    booking: (typeof mockBookings)[number];
    place: (typeof mockPlaces)[number];
    guide: (typeof mockGuides)[number];
  }>;

  return (
    <PageWrapper className="px-4 pt-14">
      <div className="mx-auto max-w-lg pb-24">
        <div className="py-4">
          <h1 className="text-display">Mes reservations</h1>
          <p className="text-body">Suivez vos prochaines experiences</p>
        </div>

        <div className="space-y-3">
          {bookings.map(({ booking, place, guide }) => (
            <article key={booking.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={place.image} alt={place.name} className="h-36 w-full object-cover" />
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold">{place.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {place.region}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(booking.status)}`}>
                    {statusLabel(booking.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 text-xs">
                  <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {booking.date}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {booking.timeSlot}
                  </div>
                  <p className="col-span-2 text-foreground">Guide: {guide.name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary">{booking.totalPrice} MAD</p>
                  <Link to={`/place/${place.id}`} className="text-xs font-semibold text-primary">
                    Voir le spot
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
