import { cn } from '@/lib/utils';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card p-4 space-y-3', className)}>
      <div className="h-40 w-full rounded-xl bg-muted animate-pulse-soft" />
      <div className="h-4 w-3/4 rounded bg-muted animate-pulse-soft" />
      <div className="h-3 w-1/2 rounded bg-muted animate-pulse-soft" />
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-muted animate-pulse-soft" />
        <div className="h-6 w-12 rounded-full bg-muted animate-pulse-soft" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
