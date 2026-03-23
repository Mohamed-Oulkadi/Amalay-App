import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/shared/components/ui/BrandMark';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
  transparent?: boolean;
}

export function Navbar({ title, showBack, transparent }: NavbarProps) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-4',
        transparent ? 'bg-transparent' : 'border-b border-border bg-card/80 backdrop-blur-md'
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <Link to={-1 as any} className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        {title ? (
          <h1 className="text-base font-semibold truncate">{title}</h1>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <BrandMark className="h-8 w-8 rounded-lg" />
            <span className="text-base font-bold text-foreground">AMALAY</span>
          </Link>
        )}
      </div>
      {!isLanding && (
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
      )}
    </header>
  );
}
