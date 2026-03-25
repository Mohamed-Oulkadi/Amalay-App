import { Users } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';

const visitors = [
  { id: 'v1', name: 'Sophie Martin', email: 'sophie@mail.com', visits: 3 },
  { id: 'v2', name: 'Karim Amrani', email: 'karim@mail.com', visits: 2 },
  { id: 'v3', name: 'Nadia El Hadi', email: 'nadia@mail.com', visits: 5 },
];

export default function AdminVisitorsPage() {
  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Visiteurs</h1>
          <p className="text-body">Comptes voyageurs et activite</p>
        </div>

        <div className="space-y-3 pb-24">
          {visitors.map((v) => (
            <div key={v.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{v.name}</h4>
                <p className="text-caption">{v.email}</p>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {v.visits} visites
              </span>
            </div>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
