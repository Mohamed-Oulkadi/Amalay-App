import { TrendingUp } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';
import { mockBookings } from '@/shared/lib/mockData';

export default function AdminRevenuePage() {
  const platformRate = 0.15;
  const rows = mockBookings.map((b) => ({
    id: b.id,
    total: b.totalPrice,
    fee: Math.round(b.totalPrice * platformRate),
    date: b.date,
  }));
  const total = rows.reduce((sum, r) => sum + r.fee, 0);

  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Revenus</h1>
          <p className="text-body">Commission plateforme: 15% par reservation</p>
        </div>

        <div className="mb-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-caption">Total revenus (15%)</p>
              <p className="text-lg font-bold">{total} MAD</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-24">
          {rows.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Reservation {r.id}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Total reservation: {r.total} MAD</span>
                <span className="font-semibold text-primary">Commission: {r.fee} MAD</span>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
