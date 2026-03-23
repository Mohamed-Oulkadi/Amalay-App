import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import L from 'leaflet';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { StarRating } from '@/shared/components/ui/StarRating';
import { MatchBadge } from '@/shared/components/ui/MatchBadge';
import { categories, mockPlaces } from '@/shared/lib/mockData';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

function markerColor(score: number) {
  if (score >= 80) return '#16a34a';
  if (score >= 50) return '#f59e0b';
  return '#9ca3af';
}

function markerIcon(imageUrl: string, score: number) {
  return L.divIcon({
    html: `
      <div style="position:relative;width:40px;height:48px;display:flex;align-items:flex-start;justify-content:center;">
        <div style="position:absolute;top:0;width:34px;height:34px;border-radius:9999px;overflow:hidden;border:3px solid ${markerColor(score)};box-shadow:0 2px 8px rgba(0,0,0,0.35);background:#fff;">
          <img src="${imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>
        <div style="position:absolute;top:30px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:12px solid ${markerColor(score)};"></div>
      </div>
    `,
    className: '',
    iconSize: [40, 48],
    iconAnchor: [20, 42],
    popupAnchor: [0, -36],
  });
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'priceAsc' | 'duration'>('match');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const maxPrice = Math.max(...mockPlaces.map((p) => p.price));
  const [priceLimit, setPriceLimit] = useState(maxPrice);

  const filtered = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    const spots = mockPlaces.filter((p) => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch =
        cleanSearch.length === 0 ||
        p.name.toLowerCase().includes(cleanSearch) ||
        p.region.toLowerCase().includes(cleanSearch) ||
        p.tags.some((tag) => tag.toLowerCase().includes(cleanSearch));
      const matchDifficulty = difficulty === 'all' || p.difficulty === difficulty;
      const matchPrice = p.price <= priceLimit;

      return matchCategory && matchSearch && matchDifficulty && matchPrice;
    });

    return spots.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'duration') return a.duration - b.duration;
      return b.matchScore - a.matchScore;
    });
  }, [activeCategory, difficulty, priceLimit, search, sortBy]);

  const hasActiveFilters = activeCategory !== 'all' || search.length > 0 || difficulty !== 'all' || priceLimit !== maxPrice;

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [30.1, -9.3],
        zoom: 9,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
      setMapReady(true);
      setMapError(null);

      const invalidate = () => map.invalidateSize();
      const timeoutId = window.setTimeout(invalidate, 120);
      window.addEventListener('resize', invalidate);

      return () => {
        window.clearTimeout(timeoutId);
        window.removeEventListener('resize', invalidate);
        map.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      };
    } catch {
      setMapError('Impossible de charger la carte');
      setMapReady(false);
      return;
    }
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    if (filtered.length === 0) return;

    const bounds: L.LatLngExpression[] = [];

    filtered.forEach((place) => {
      const marker = L.marker([place.lat, place.lng], { icon: markerIcon(place.image, place.matchScore) });
      marker.bindPopup(
        `<div style="min-width:180px"><div style="font-weight:700;margin-bottom:4px">${place.name}</div><div style="font-size:12px;color:#666">${place.region}</div><a href="/place/${place.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#0f766e;font-weight:600">Voir le spot</a></div>`
      );
      marker.addTo(layer);
      bounds.push([place.lat, place.lng]);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 11);
    } else {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    window.setTimeout(() => map.invalidateSize(), 0);
  }, [filtered]);

  function resetFilters() {
    setActiveCategory('all');
    setSearch('');
    setDifficulty('all');
    setPriceLimit(maxPrice);
    setSortBy('match');
  }

  return (
    <PageWrapper className="pt-14">
      <div className="px-4 pb-2 pt-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un spot, une region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
              showFilters ? 'bg-primary text-primary-foreground' : 'bg-primary-light text-primary'
            )}
            aria-label="Afficher les filtres"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
              activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-foreground'
            )}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="mx-4 mb-3 rounded-2xl border border-border bg-card p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Filtres</p>
            {hasActiveFilters && (
              <button type="button" onClick={resetFilters} className="flex items-center gap-1 text-xs font-semibold text-primary">
                <X className="h-3.5 w-3.5" />
                Reinitialiser
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'all' | 'easy' | 'medium' | 'hard')}
              className="rounded-lg border border-border bg-background px-2 py-2 text-xs"
            >
              <option value="all">Difficulte: Toutes</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyenne</option>
              <option value="hard">Difficile</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'match' | 'rating' | 'priceAsc' | 'duration')}
              className="rounded-lg border border-border bg-background px-2 py-2 text-xs"
            >
              <option value="match">Tri: Match</option>
              <option value="rating">Tri: Note</option>
              <option value="priceAsc">Tri: Prix</option>
              <option value="duration">Tri: Duree</option>
            </select>
          </div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Prix max</span>
              <span className="font-semibold text-primary">{priceLimit} MAD</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={10}
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      )}

      <div className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-title">{filtered.length} spots trouves</h2>
          {hasActiveFilters && (
            <button type="button" onClick={resetFilters} className="text-xs font-semibold text-primary">
              Effacer filtres
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Carte interactive des spots</span>
          <span>Vert: meilleur match</span>
        </div>
        <div className="relative h-[36vh] w-full overflow-hidden rounded-2xl border border-border">
          <div ref={mapContainerRef} className="h-full w-full" />
          {!mapReady && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-xs text-muted-foreground">
              Chargement de la carte...
            </div>
          )}
          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 text-xs text-destructive">
              {mapError}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        {filtered.length > 0 ? (
          filtered.map((place) => (
            <Link key={place.id} to={`/place/${place.id}`} className="flex gap-3 rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-sm">
              <img src={place.image} alt={place.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold">{place.name}</h3>
                  <MatchBadge score={place.matchScore} />
                </div>
                <p className="mt-0.5 text-caption">{place.region} · {place.duration}h · {place.difficulty}</p>
                <div className="mt-2 flex items-center justify-between">
                  <StarRating rating={place.rating} />
                  <span className="text-xs font-bold text-primary">{place.price} MAD</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
            <p className="text-sm font-semibold">Aucun spot ne correspond a votre recherche</p>
            <p className="mt-1 text-xs text-muted-foreground">Essayez une autre categorie ou reduisez les filtres</p>
            <button type="button" onClick={resetFilters} className="mt-3 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              Reinitialiser les filtres
            </button>
          </div>
        )}
      </div>
      <div className="h-1" />
    </PageWrapper>
  );
}
