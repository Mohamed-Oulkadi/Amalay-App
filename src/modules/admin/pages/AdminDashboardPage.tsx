import { Users, CalendarDays, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';
import { mockBookings, mockEvents, mockGuides, mockPosts } from '@/shared/lib/mockData';

export default function AdminDashboardPage() {
  const pendingCandidatures = 3;
  const eventsCount = mockEvents.length;
  const communityPosts = mockPosts.length;
  const activeGuides = mockGuides.length;
  const revenue = mockBookings.reduce((sum, b) => sum + b.totalPrice * 0.15, 0);

  const cards = [
    { label: 'Candidatures', value: pendingCandidatures, icon: ShieldCheck, to: '/admin/candidatures' },
    { label: 'Evenements', value: eventsCount, icon: CalendarDays, to: '/admin/events' },
    { label: 'Communaute', value: communityPosts, icon: Users, to: '/admin/community' },
    { label: 'Guides actifs', value: activeGuides, icon: Users, to: '/admin/visitors' },
    { label: 'Revenus (15%)', value: `${Math.round(revenue)} MAD`, icon: TrendingUp, to: '/admin/revenue' },
  ];

  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Admin</h1>
          <p className="text-body">Gestion des guides, evenements, communaute et revenus</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.label} to={c.to} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
                <c.icon className="h-4 w-4" />
              </div>
              <div className="mt-2 text-lg font-bold">{c.value}</div>
              <div className="text-caption">{c.label}</div>
            </Link>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
