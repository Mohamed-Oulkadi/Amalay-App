import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, Users, Shield, ArrowRight, Star, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPlaces, mockGuides, mockEvents } from '@/shared/lib/mockData';
import { StarRating } from '@/shared/components/ui/StarRating';
import { MatchBadge, CertifiedBadge } from '@/shared/components/ui/MatchBadge';

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-souss px-4 pt-20 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-souss/90 to-souss" />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url(/paradise-valey.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <motion.div className="relative z-10 mx-auto max-w-lg" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Compass className="h-3.5 w-3.5" /> Tourisme Rural Intelligent
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-souss-foreground sm:text-4xl">
            AMALAY<br />
            <span className="text-primary">Revelateur des tresors</span><br />
            du Souss-Massa
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-souss-foreground/70">
            Revelez les tresors du Souss-Massa avec des recommandations intelligentes et des guides locaux.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" className="rounded-xl font-semibold shadow-lg shadow-primary/25">
              <Link to="/onboarding">Commencer <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-white/40 bg-white/90 font-semibold text-souss hover:bg-white">
              <Link to="/explore">Explorer</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-souss-foreground/60">
            <div className="text-center">
              <div className="text-xl font-bold text-souss-foreground">50+</div>
              <div className="text-[10px]">Spots ruraux</div>
            </div>
            <div className="h-8 w-px bg-souss-foreground/20" />
            <div className="text-center">
              <div className="text-xl font-bold text-souss-foreground">30+</div>
              <div className="text-[10px]">Guides certifiés</div>
            </div>
            <div className="h-8 w-px bg-souss-foreground/20" />
            <div className="text-center">
              <div className="text-xl font-bold text-souss-foreground">4.8</div>
              <div className="text-[10px]">Note moyenne</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="px-4 py-10">
        <h2 className="text-display text-center mb-8">Comment ça marche ?</h2>
        <motion.div className="mx-auto max-w-lg space-y-4" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
          {[
            { icon: Users, title: 'Créez votre profil', desc: 'Répondez à 7 questions pour que notre IA comprenne vos envies.' },
            { icon: Compass, title: 'Recevez vos recommandations', desc: 'Spot + activité + guide, parfaitement adaptés à votre profil.' },
            { icon: MapPin, title: 'Réservez & explorez', desc: 'Contactez votre guide et vivez une expérience rurale unique.' },
          ].map((step, i) => (
            <motion.div key={i} variants={fadeUp} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-primary mb-0.5">Étape {i + 1}</div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-body mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured spots */}
      <section className="px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title">Spots populaires</h2>
          <Link to="/explore" className="flex items-center gap-1 text-xs font-semibold text-primary">
            Voir tout <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {mockPlaces.slice(0, 4).map((place) => (
            <Link key={place.id} to={`/place/${place.id}`} className="shrink-0 w-64">
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-36">
                  <img src={place.image} alt={place.name} className="h-full w-full object-cover" loading="lazy" />
                  <MatchBadge score={place.matchScore} className="absolute top-2 right-2" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{place.name}</h3>
                  <p className="text-caption mt-0.5">{place.region}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <StarRating rating={place.rating} />
                    <span className="text-xs font-bold text-primary">{place.price} MAD</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Events */}
      <section className="px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-title">Événements</h2>
          <Link to="/events" className="flex items-center gap-1 text-xs font-semibold text-primary">
            Voir tout <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="text-body mb-3">Découvrez les événements les plus attendus de Souss Massa.</p>

        <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {mockEvents.slice(0, 4).map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="w-64 shrink-0">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative h-36">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute right-2 top-2 rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-semibold text-primary capitalize">
                    {event.category}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold">{event.title}</h3>
                  <p className="mt-0.5 text-caption">{event.region}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {event.date} - {event.time}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Featured guides */}
      <section className="px-4 py-8">
        <h2 className="text-title mb-4">Guides locaux</h2>
        <div className="space-y-3">
          {mockGuides.map((guide) => (
            <Link key={guide.id} to={`/guide/${guide.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={guide.avatar} alt={guide.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate">{guide.name}</span>
                  {guide.certified && <CertifiedBadge />}
                </div>
                <p className="text-caption truncate">{guide.specialty} · {guide.region}</p>
              </div>
              <div className="text-right shrink-0">
                <StarRating rating={guide.rating} />
                <p className="text-caption mt-0.5">{guide.visitCount} visites</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA for guides */}
      <section className="mx-4 mb-24 rounded-2xl bg-guide p-6 text-guide-foreground">
        <Shield className="h-8 w-8 mb-3 opacity-80" />
        <h2 className="text-lg font-bold">Vous êtes guide local ?</h2>
        <p className="text-sm mt-1 opacity-80">Rejoignez AMALAY, listez vos spots et augmentez votre visibilité auprès des touristes.</p>
        <Button asChild variant="secondary" className="mt-4 rounded-xl font-semibold">
          <Link to="/guide/register">Devenir guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </section>
    </div>
  );
}


