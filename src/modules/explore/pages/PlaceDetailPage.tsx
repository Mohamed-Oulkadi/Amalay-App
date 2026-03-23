import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Mountain, MapPin, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/shared/components/ui/StarRating';
import { MatchBadge, CertifiedBadge } from '@/shared/components/ui/MatchBadge';
import { mockPlaces, mockGuides } from '@/shared/lib/mockData';

export default function PlaceDetailPage() {
  const { id } = useParams();
  const place = mockPlaces.find((p) => p.id === id) || mockPlaces[0];
  const guide = mockGuides.find((g) => g.id === place.guideId) || mockGuides[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero image */}
      <div className="relative h-64">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-souss/50 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link to="/explore" className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-4 -mt-6 relative z-10">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-bold">{place.name}</h1>
              <p className="text-caption flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {place.region}</p>
            </div>
            <MatchBadge score={place.matchScore} />
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {place.duration}h</span>
            <span className="flex items-center gap-1"><Mountain className="h-3.5 w-3.5" /> {place.difficulty}</span>
            <StarRating rating={place.rating} />
          </div>

          <p className="text-sm mt-4 leading-relaxed text-foreground">{place.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {place.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>

        {/* Guide card */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">VOTRE GUIDE</h3>
          <Link to={`/guide/${guide.id}`} className="flex items-center gap-3">
            <img src={guide.avatar} alt={guide.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{guide.name}</span>
                {guide.certified && <CertifiedBadge />}
              </div>
              <p className="text-caption">{guide.specialty}</p>
              <StarRating rating={guide.rating} size="sm" />
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card px-4 py-3 safe-area-pb">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">{place.price} MAD</span>
            <span className="text-caption ml-1">/ personne</span>
          </div>
          <Button asChild className="rounded-xl font-semibold px-6">
            <Link to={`/booking/${place.id}`}>Réserver maintenant</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
