import { NavLink } from 'react-router-dom';
import { Anchor, LayoutDashboard, ShieldCheck, CalendarDays, Users, User, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/candidatures', label: 'Candidatures', icon: ShieldCheck },
  { to: '/admin/events', label: 'Evenements', icon: CalendarDays },
  { to: '/admin/community', label: 'Communaute', icon: Users },
  { to: '/admin/visitors', label: 'Visiteurs', icon: User },
  { to: '/admin/revenue', label: 'Revenus', icon: TrendingUp },
];

export function AdminNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <aside
        className={cn(
          'h-full w-full overflow-hidden border-r border-border bg-card text-foreground transition-all duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Anchor className="h-5 w-5" />
          </div>
          <div className="text-lg font-bold tracking-wide">AMALAY</div>
        </div>

        <div className="px-3 py-4">
          <div className="mb-2 text-xs font-semibold text-muted-foreground">MENU ADMIN</div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              end={l.to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                )
              }
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
