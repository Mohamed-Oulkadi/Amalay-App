import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AdminNav } from '@/modules/admin/components/AdminNav';
import { cn } from '@/lib/utils';

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const closeIfMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          'grid min-h-screen transition-[grid-template-columns] duration-300',
          open ? 'grid-cols-[240px_1fr]' : 'grid-cols-[0px_1fr]'
        )}
      >
        <AdminNav isOpen={open} onClose={closeIfMobile} />
        <div className="flex min-h-screen flex-1 flex-col">
          <div className="flex h-14 items-center border-b border-border bg-card px-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex-1 px-4 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
