import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

interface MatchBadgeProps {
  score: number;
  className?: string;
}

export function MatchBadge({ score, className }: MatchBadgeProps) {
  const color =
    score >= 80
      ? 'bg-emerald-600/85 text-white border-emerald-200/40'
      : score >= 50
        ? 'bg-amber-500/85 text-white border-amber-200/40'
        : 'bg-slate-900/70 text-white border-white/20';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-md backdrop-blur-sm',
        color,
        className,
      )}
    >
      {score}% match
    </span>
  );
}

export function CertifiedBadge({ className }: { className?: string }) {
  return (
    <BadgeCheck className={cn('h-4 w-4 text-primary fill-primary-light', className)} />
  );
}
