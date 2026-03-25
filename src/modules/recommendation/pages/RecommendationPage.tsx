import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Mountain, ArrowRight, RefreshCw, Home, UtensilsCrossed, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { StarRating } from '@/shared/components/ui/StarRating';
import { MatchBadge, CertifiedBadge } from '@/shared/components/ui/MatchBadge';
import { mockPlaces, mockGuides } from '@/shared/lib/mockData';
import { useState } from 'react';

function ImageCarousel({
  images,
  label,
  Icon,
  alt,
}: {
  images: string[];
  label: string;
  Icon: typeof Home;
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const last = images.length - 1;
  const goPrev = () => setIndex((i) => (i <= 0 ? last : i - 1));
  const goNext = () => setIndex((i) => (i >= last ? 0 : i + 1));

  return (
    <div className="overflow-hidden rounded-xl bg-muted/50">
      <div className="relative h-32">
        <img src={images[index]} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 text-[11px] font-semibold text-white">
          <Icon className="h-3.5 w-3.5" /> {label}
        </div>
        <div className="absolute inset-y-0 left-2 z-10 flex items-center">
          <button type="button" onClick={goPrev} className="rounded-full bg-black/45 p-1 text-white backdrop-blur-sm">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 z-10 flex items-center">
          <button type="button" onClick={goNext} className="rounded-full bg-black/45 p-1 text-white backdrop-blur-sm">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationPage() {
  const place = mockPlaces[0]; // top match
  const guide = mockGuides[0];

  return (
    <PageWrapper className="pt-14 px-4">
      <div className="py-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-accent" />
          <h1 className="text-display">Votre recommandation</h1>
        </div>
        <p className="text-body">Basée sur votre profil de voyageur</p>
      </div>

      {/* Main recommendation card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card overflow-hidden shadow-md"
      >
        <div className="relative h-52">
          <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-souss/60 to-transparent" />
          <MatchBadge score={place.matchScore} className="absolute top-3 right-3 text-sm px-3 py-1" />
          <div className="absolute bottom-3 left-3 text-souss-foreground">
            <h2 className="text-lg font-bold">{place.name}</h2>
            <p className="text-xs opacity-80">{place.region}</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">{place.description}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {place.duration}h</span>
            <span className="flex items-center gap-1"><Mountain className="h-3.5 w-3.5" /> {place.difficulty}</span>
            <StarRating rating={place.rating} />
          </div>

          {/* Homestay */}
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-muted/50">
              <ImageCarousel images={place.homestay.houseImages} label="Maison" Icon={Home} alt={place.homestay.house} />
              <div className="p-3">
                <p className="text-sm font-semibold">{place.homestay.house}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-muted/50">
              <ImageCarousel images={place.homestay.mealsImages} label="Repas" Icon={UtensilsCrossed} alt="Repas" />
              <div className="p-3">
                <div className="flex flex-wrap gap-1.5">
                  {place.homestay.meals.slice(0, 2).map((meal) => (
                    <span key={meal} className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {meal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-muted/50">
              <ImageCarousel images={place.homestay.activitiesImages} label="Activites" Icon={Activity} alt="Activites" />
              <div className="p-3">
                <div className="flex flex-wrap gap-1.5">
                  {place.homestay.activities.slice(0, 2).map((activity) => (
                    <span key={activity} className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Guide info */}
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <img src={guide.avatar} alt={guide.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{guide.name}</span>
                {guide.certified && <CertifiedBadge />}
              </div>
              <p className="text-caption">{guide.specialty}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRating rating={guide.rating} size="sm" />
                <span className="text-caption">· {guide.visitCount} visites</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div>
              <span className="text-xl font-bold text-primary">{place.price} MAD</span>
              <span className="text-caption ml-1">/ personne</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1 rounded-xl font-semibold">
              <Link to={`/booking/${place.id}`}>Réserver <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Other suggestions */}
      <div className="mt-6 mb-4">
        <h3 className="text-title mb-3">Autres suggestions</h3>
        <div className="space-y-3">
          {mockPlaces.slice(1, 4).map((p) => (
            <Link key={p.id} to={`/place/${p.id}`} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={p.image} alt={p.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold truncate">{p.name}</h4>
                  <MatchBadge score={p.matchScore} />
                </div>
                <p className="text-caption">{p.region} · {p.price} MAD</p>
                <p className="mt-1 text-[11px] text-muted-foreground truncate">Maison: {p.homestay.house}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {p.homestay.meals[0]}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {p.homestay.activities[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
