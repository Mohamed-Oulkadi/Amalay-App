import { useLocation } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockBookings, mockPlaces, mockGuides } from '@/shared/lib/mockData';
import { cn } from '@/lib/utils';

type LocationState = { focusId?: string } | null;

export default function GuideBookingsPage() {
  const location = useLocation();
  const state = location.state as LocationState;
  const focusId = state?.focusId;

  return (
    <PageWrapper className="pt-14 px-4">
      <div className="py-4">
        <h1 className="text-display">Mes reservations</h1>
        <p className="text-body">Toutes vos demandes et reservations confirmees</p>
      </div>

      <div className="space-y-3 pb-24">
        {mockBookings.map((b) => {
          const place = mockPlaces.find((p) => p.id === b.placeId);
          const guide = mockGuides.find((g) => g.id === b.guideId);
          const statusLabel = b.status === 'confirmed' ? 'Confirmee' : 'En attente';
          const statusClass = b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';

          return (
            <div
              key={b.id}
              className={cn(
                'rounded-2xl border border-border bg-card p-3 transition-shadow',
                focusId === b.id && 'ring-2 ring-primary/50'
              )}
            >
              <div className="flex items-center gap-3">
                <img src={place?.image} alt={place?.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{place?.name}</h4>
                  <p className="text-caption flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {place?.region}
                  </p>
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', statusClass)}>
                  {statusLabel}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {b.date} · {b.timeSlot}
                </span>
                <span className="text-xs font-bold text-primary">{b.totalPrice} MAD</span>
                <span className="text-xs">{guide?.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
