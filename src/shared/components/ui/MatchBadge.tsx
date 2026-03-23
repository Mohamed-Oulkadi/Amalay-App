import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

interface MatchBadgeProps {
  score: number;
  className?: string;
}

export function MatchBadge({ score, className }: MatchBadgeProps) {
  const color = score >= 80 ? 'bg-guide/10 text-guide' : score >= 50 ? 'bg-accent-light text-accent' : 'bg-muted text-muted-foreground';
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold', color, className)}>
      {score}% match
    </span>
  );
}

export function CertifiedBadge({ className }: { className?: string }) {
  return (
    <BadgeCheck className={cn('h-4 w-4 text-primary fill-primary-light', className)} />
  );
}
