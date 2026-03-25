import { useMemo, useState } from 'react';
import { MapPin, Plus, Search, Star } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/shared/components/ui/StarRating';
import { usePlacesStore } from '@/store/placesStore';

export default function GuidePlacesPage() {
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const placesData = usePlacesStore((s) => s.places);
  const addPlace = usePlacesStore((s) => s.addPlace);

  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('nature');
  const [price, setPrice] = useState(120);
  const [duration, setDuration] = useState(3);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [description, setDescription] = useState('');
  const [house, setHouse] = useState('');
  const [meals, setMeals] = useState('');
  const [activities, setActivities] = useState('');
  const [houseFiles, setHouseFiles] = useState<FileList | null>(null);
  const [mealsFiles, setMealsFiles] = useState<FileList | null>(null);
  const [activitiesFiles, setActivitiesFiles] = useState<FileList | null>(null);

  function parseList(value: string) {
    return value.split(',').map((v) => v.trim()).filter(Boolean);
  }

  const places = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return placesData;
    return placesData.filter((p) => `${p.name} ${p.region}`.toLowerCase().includes(q));
  }, [query, placesData]);

  function resetForm() {
    setName('');
    setRegion('');
    setCategory('nature');
    setPrice(120);
    setDuration(3);
    setDifficulty('medium');
    setDescription('');
    setHouse('');
    setMeals('');
    setActivities('');
    setHouseFiles(null);
    setMealsFiles(null);
    setActivitiesFiles(null);
  }

  function addSpot(e: React.FormEvent) {
    e.preventDefault();
    const toUrls = (files: FileList | null) =>
      files ? Array.from(files).map((f) => URL.createObjectURL(f)) : [];
    const houseImgs = toUrls(houseFiles);
    const mealsImgs = toUrls(mealsFiles);
    const activitiesImgs = toUrls(activitiesFiles);
    const newPlace = {
      id: String(Date.now()),
      name: name.trim(),
      region: region.trim(),
      category,
      rating: 4.7,
      price: Number(price),
      duration: Number(duration),
      difficulty,
      lat: 30.0,
      lng: -9.0,
      matchScore: 85,
      image: (houseImgs[0] ?? mealsImgs[0] ?? activitiesImgs[0] ?? 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'),
      description: description.trim(),
      tags: [category],
      homestay: {
        house: house.trim() || 'Maison locale',
        houseImages: houseImgs.length ? houseImgs : ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'],
        meals: parseList(meals).length ? parseList(meals) : ['Tajine maison'],
        mealsImages: mealsImgs.length ? mealsImgs : ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
        activities: parseList(activities).length ? parseList(activities) : ['Balade village'],
        activitiesImages: activitiesImgs.length ? activitiesImgs : ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800'],
      },
      guideId: 'g1',
    };

    addPlace(newPlace);
    resetForm();
    setShowForm(false);
  }

  return (
    <PageWrapper className="pt-14 px-4">
      <div className="py-4">
        <h1 className="text-display">Mes spots</h1>
        <p className="text-body">Gerer vos spots et publier de nouvelles experiences</p>
      </div>

      <div className="mb-4 rounded-2xl border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Ajouter un spot</h2>
          <Button type="button" variant="outline" className="rounded-xl text-xs" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Fermer' : 'Nouveau spot'}
          </Button>
        </div>
        {showForm && (
          <form onSubmit={addSpot} className="mt-3 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">Nom du spot</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ex: Vallee du Paradis"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Region</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ex: Taroudant"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs font-medium text-foreground">Categorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="nature">Nature</option>
                  <option value="culture">Culture</option>
                  <option value="gastronomy">Gastronomie</option>
                  <option value="adventure">Aventure</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Prix (MAD)</label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Duree (h)</label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">Difficulte</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="easy">Facile</option>
                  <option value="medium">Moyen</option>
                  <option value="hard">Difficile</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Maison</label>
                <input
                  type="text"
                  required
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Maison d hotes..."
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                placeholder="Decrivez l experience..."
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">Repas (separes par virgule)</label>
                <input
                  type="text"
                  value={meals}
                  onChange={(e) => setMeals(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tajine, Couscous..."
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Activites (separees par virgule)</label>
                <input
                  type="text"
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Randonnee, Atelier..."
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs font-medium text-foreground">Images maison</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setHouseFiles(e.target.files)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Images repas</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setMealsFiles(e.target.files)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Images activites</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setActivitiesFiles(e.target.files)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="rounded-xl text-sm font-semibold">
                Ajouter le spot
              </Button>
              <Button type="button" variant="ghost" className="rounded-xl text-sm" onClick={resetForm}>
                Reinitialiser
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un spot..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="space-y-3 pb-24">
        {places.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative h-36">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
              <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">
                {p.category}
              </span>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{p.name}</h3>
                  <p className="text-caption mt-0.5 inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {p.region}
                  </p>
                </div>
                <div className="text-right">
                  <StarRating rating={p.rating} size="sm" />
                  <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star className="h-3.5 w-3.5" /> {p.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
              <p className="mt-2 text-xs font-medium text-foreground">Maison: {p.homestay?.house}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.homestay?.meals?.slice(0, 2).map((meal) => (
                  <span key={meal} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {meal}
                  </span>
                ))}
                {p.homestay?.activities?.slice(0, 2).map((activity) => (
                  <span key={activity} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {activity}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-xl text-xs px-3 py-1">
                  Modifier
                </Button>
                <Button variant="ghost" className="rounded-xl text-xs px-3 py-1">
                  Archiver
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB removed to avoid confusion with chatbot */}
    </PageWrapper>
  );
}
