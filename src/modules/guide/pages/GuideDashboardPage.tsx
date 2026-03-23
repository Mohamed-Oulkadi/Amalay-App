import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, MapPin, Plus, Check, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockPlaces, mockBookings, mockGuides } from '@/shared/lib/mockData';

const chartData = [
  { day: '1 Mar', bookings: 2 }, { day: '5 Mar', bookings: 4 }, { day: '10 Mar', bookings: 3 },
  { day: '15 Mar', bookings: 6 }, { day: '20 Mar', bookings: 5 }, { day: '25 Mar', bookings: 8 },
  { day: '30 Mar', bookings: 7 },
];

const stats = [
  { label: 'Revenu', value: '4,800 MAD', icon: TrendingUp, color: 'text-primary bg-primary-light' },
  { label: 'Visites', value: '32', icon: Users, color: 'text-guide bg-guide-light' },
  { label: 'Note moy.', value: '4.9', icon: Star, color: 'text-accent bg-accent-light' },
  { label: 'Spots actifs', value: '3', icon: MapPin, color: 'text-foreground bg-muted' },
];

const stagger = { animate: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

export default function GuideDashboardPage() {
  return (
    <PageWrapper className="pt-14 px-4">
      <div className="py-4">
        <p className="text-body">Bonjour,</p>
        <h1 className="text-display">{mockGuides[0].name} 👋</h1>
      </div>

      {/* Stats grid */}
      <motion.div className="grid grid-cols-2 gap-3" variants={stagger} initial="initial" animate="animate">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="rounded-2xl border border-border bg-card p-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.color}`}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="mt-2 text-lg font-bold">{s.value}</div>
            <div className="text-caption">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        <h3 className="text-title mb-3">Réservations — 30 jours</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pending bookings */}
      <div className="mt-6">
        <h3 className="text-title mb-3">Réservations en attente</h3>
        <div className="space-y-3">
          {mockBookings.filter((b) => b.status === 'pending').map((b) => {
            const place = mockPlaces.find((p) => p.id === b.placeId);
            return (
              <div key={b.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <img src={place?.image} alt={place?.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{place?.name}</h4>
                  <p className="text-caption">{b.date} · {b.timeSlot}</p>
                  <p className="text-xs font-bold text-primary mt-0.5">{b.totalPrice} MAD</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-guide-light text-guide">
                    <Check className="h-4 w-4" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* My spots */}
      <div className="mt-6 mb-4">
        <h3 className="text-title mb-3">Mes spots</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {mockPlaces.slice(0, 3).map((p) => (
            <div key={p.id} className="shrink-0 w-48 rounded-2xl border border-border bg-card overflow-hidden">
              <img src={p.image} alt={p.name} className="h-24 w-full object-cover" loading="lazy" />
              <div className="p-2.5">
                <h4 className="text-xs font-semibold truncate">{p.name}</h4>
                <p className="text-caption">{p.region}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
        <Plus className="h-6 w-6 text-primary-foreground" />
      </button>
    </PageWrapper>
  );
}
