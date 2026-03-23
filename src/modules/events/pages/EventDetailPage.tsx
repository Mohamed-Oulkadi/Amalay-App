import { Link, useParams } from 'react-router-dom';
import { CalendarDays, MapPin, Ticket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockEvents, mockGuides } from '@/shared/lib/mockData';

export default function EventDetailPage() {
  const { id } = useParams();
  const event = mockEvents.find((item) => item.id === id) ?? mockEvents[0];
  const guides = mockGuides.filter((guide) => guide.region.toLowerCase() === event.region.toLowerCase());

  return (
    <PageWrapper className="pt-14" hasBottomNav={false}>
      <div className="mx-auto max-w-lg pb-24">
        <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />

        <div className="space-y-4 px-4 pt-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h1 className="text-lg font-bold">{event.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {event.location}, {event.region}
              </p>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> {event.date} a {event.time}
              </p>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" /> {event.registered}/{event.capacity} participants
              </p>
              <p className="inline-flex items-center gap-2 font-semibold text-primary">
                <Ticket className="h-4 w-4" /> {event.price === 0 ? 'Gratuit' : `${event.price} MAD`}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Guides disponibles</h2>
            {guides.length > 0 ? (
              <div className="space-y-3">
                {guides.map((guide) => (
                  <div key={guide.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                    <img src={guide.avatar} alt={guide.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{guide.name}</p>
                      <p className="text-xs text-muted-foreground">{guide.specialty}</p>
                      <p className="text-xs text-muted-foreground">{guide.rating.toFixed(1)} · {guide.visitCount} visites</p>
                    </div>
                    <Button asChild size="sm" className="rounded-lg">
                      <Link to={`/guide/${guide.id}`}>Voir</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Aucun guide disponible pour cette zone pour le moment.</p>
            )}
          </section>

          <div className="grid grid-cols-1 gap-2 px-1">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/events">Retour</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
