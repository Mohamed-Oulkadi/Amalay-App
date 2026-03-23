import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Search, Ticket } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockEvents } from '@/shared/lib/mockData';
import { cn } from '@/lib/utils';

const categories = ['all', 'culture', 'sport', 'terroir'];

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockEvents.filter((event) => {
      const matchCategory = category === 'all' || event.category === category;
      const matchSearch =
        q.length === 0 ||
        event.title.toLowerCase().includes(q) ||
        event.region.toLowerCase().includes(q) ||
        event.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  return (
    <PageWrapper className="px-4 pt-14">
      <div className="mx-auto max-w-lg pb-24">
        <div className="py-4">
          <h1 className="text-display">Evenements</h1>
          <p className="text-body">Decouvrez les evenements les plus attendus de Souss Massa.</p>
        </div>

        <div className="mb-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un evenement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize',
                category === item ? 'border-primary bg-primary-light text-primary' : 'border-border bg-card'
              )}
            >
              {item === 'all' ? 'Tous' : item}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="block overflow-hidden rounded-2xl border border-border bg-card">
              <img src={event.image} alt={event.title} className="h-36 w-full object-cover" loading="lazy" />
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold">{event.title}</h2>
                  <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary capitalize">{event.category}</span>
                </div>

                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {event.region}
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-2 text-xs">
                  <p className="inline-flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {event.date} - {event.time}
                  </p>
                  <p className="inline-flex items-center justify-end gap-1 font-semibold text-primary">
                    <Ticket className="h-3.5 w-3.5" /> {event.price === 0 ? 'Gratuit' : `${event.price} MAD`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
