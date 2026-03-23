import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export function StarRating({ rating, size = 'sm', showValue = true }: StarRatingProps) {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-1">
      <Star className={cn(iconSize, 'fill-accent text-accent')} />
      {showValue && (
        <span className={cn('font-semibold', size === 'sm' ? 'text-xs' : 'text-sm')}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
