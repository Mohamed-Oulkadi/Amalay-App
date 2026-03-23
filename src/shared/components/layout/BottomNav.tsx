import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, CalendarDays, Users, User, LayoutDashboard, MapPin, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const touristTabs = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/explore', icon: Map, label: 'Explorer' },
  { to: '/bookings', icon: CalendarDays, label: 'Réservations' },
  { to: '/community', icon: Users, label: 'Communauté' },
  { to: '/profile', icon: User, label: 'Profil' },
];

const guideTabs = [
  { to: '/guide/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/guide/places', icon: MapPin, label: 'Mes Spots' },
  { to: '/guide/bookings', icon: CalendarDays, label: 'Réservations' },
  { to: '/guide/training', icon: GraduationCap, label: 'Formation' },
  { to: '/guide/profile', icon: User, label: 'Profil' },
];

export function BottomNav() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? 'tourist';

  // Hide on auth/onboarding pages
  const hiddenPaths = ['/login', '/register', '/guide/register', '/onboarding', '/booking/'];
  if (hiddenPaths.some((p) => location.pathname.startsWith(p))) return null;

  const tabs = role === 'guide' ? guideTabs : touristTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-border bg-card safe-area-pb">
      <div className="mx-auto flex h-full max-w-lg items-center justify-around px-2">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
