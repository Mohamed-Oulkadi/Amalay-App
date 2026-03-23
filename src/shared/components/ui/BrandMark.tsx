import { useState } from 'react';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn('flex items-center justify-center overflow-hidden rounded-lg bg-primary', className)}>
      {!imageError ? (
        <img
          src="/amalay-logo.jpeg"
          alt="AMALAY"
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <Compass className="h-4 w-4 text-primary-foreground" />
      )}
    </div>
  );
}
