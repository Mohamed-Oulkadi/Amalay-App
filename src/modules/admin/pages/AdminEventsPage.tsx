import { useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';
import { mockEvents } from '@/shared/lib/mockData';
import { Button } from '@/components/ui/button';

export default function AdminEventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [date, setDate] = useState('');

  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Evenements</h1>
          <p className="text-body">Ajouter et gerer les evenements</p>
        </div>

        <div className="mb-4 rounded-2xl border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Nouvel evenement</h2>
            <Button type="button" variant="outline" className="rounded-xl text-xs" onClick={() => setShowForm((v) => !v)}>
              {showForm ? 'Fermer' : 'Ajouter'}
            </Button>
          </div>
          {showForm && (
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <Button type="button" className="rounded-xl text-xs">
                <Plus className="mr-1 h-4 w-4" /> Enregistrer (mock)
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3 pb-24">
          {mockEvents.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{e.title}</h4>
                  <p className="text-caption">{e.region} · {e.date}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {e.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
