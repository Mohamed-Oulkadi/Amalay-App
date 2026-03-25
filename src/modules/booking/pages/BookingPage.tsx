import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, MapPin, Minus, Plus, User, Home, UtensilsCrossed, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockGuides } from '@/shared/lib/mockData';
import { usePlacesStore } from '@/store/placesStore';

const timeSlots = ['08:00', '10:00', '14:00', '16:00'];

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
      <div className="relative h-36">
        <img src={images[index]} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 text-xs font-semibold text-white">
          <Icon className="h-3.5 w-3.5" /> {label}
        </div>
        <div className="absolute inset-y-0 left-2 z-10 flex items-center">
          <button type="button" onClick={goPrev} className="rounded-full bg-black/45 p-1.5 text-white backdrop-blur-sm">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 z-10 flex items-center">
          <button type="button" onClick={goNext} className="rounded-full bg-black/45 p-1.5 text-white backdrop-blur-sm">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function toInputDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const places = usePlacesStore((s) => s.places);
  const place = places.find((p) => p.id === id) ?? places[0];
  const guide = mockGuides.find((g) => g.id === place.guideId) ?? mockGuides[0];

  const [date, setDate] = useState(toInputDate(2));
  const [timeSlot, setTimeSlot] = useState(timeSlots[0]);
  const [participants, setParticipants] = useState(1);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const serviceFee = 20;
  const subtotal = useMemo(() => place.price * participants, [place.price, participants]);
  const total = subtotal + serviceFee;

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!contactName.trim() || !phone.trim()) {
      toast.error('Merci de remplir nom et telephone');
      return;
    }

    toast.success('Reservation envoyee avec succes');
    navigate('/bookings');
  }

  return (
    <PageWrapper className="px-4 pt-14 pb-28" hasBottomNav={false}>
      <div className="mx-auto max-w-lg">
        <div className="mb-4 flex items-center gap-2">
          <Link to={-1 as any} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-bold">Reservation</h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <img src={place.image} alt={place.name} className="h-36 w-full object-cover" />
          <div className="space-y-2 p-4">
            <h2 className="text-base font-semibold">{place.name}</h2>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {place.region}
            </p>
            <p className="text-xs text-muted-foreground">Guide: {guide.name}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">Homestay</h3>
          <div className="grid gap-3">
            <div>
              <ImageCarousel images={place.homestay.houseImages} label="Maison" Icon={Home} alt={place.homestay.house} />
              <p className="mt-2 text-sm font-semibold">{place.homestay.house}</p>
            </div>
            <div>
              <ImageCarousel images={place.homestay.mealsImages} label="Repas" Icon={UtensilsCrossed} alt="Repas" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {place.homestay.meals.map((meal) => (
                  <span key={meal} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {meal}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <ImageCarousel images={place.homestay.activitiesImages} label="Activites" Icon={Activity} alt="Activites" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {place.homestay.activities.map((activity) => (
                  <span key={activity} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4 rounded-2xl border border-border bg-card p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" /> Date
              </span>
              <input
                type="date"
                min={toInputDate(1)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Heure
              </span>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">Participants</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setParticipants((v) => Math.max(1, v - 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="inline-flex h-9 min-w-16 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-semibold">
                {participants}
              </div>
              <button
                type="button"
                onClick={() => setParticipants((v) => Math.min(10, v + 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <label className="block space-y-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <User className="h-3.5 w-3.5" /> Nom complet
            </span>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Votre nom"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-muted-foreground">Telephone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06xxxxxxxx"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-muted-foreground">Notes (optionnel)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Besoins specifiques..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="rounded-xl bg-muted/40 p-3 text-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">{place.price} MAD x {participants}</span>
              <span>{subtotal} MAD</span>
            </div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">Frais de service</span>
              <span>{serviceFee} MAD</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span>Total</span>
              <span className="text-primary">{total} MAD</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Date: {date} a {timeSlot}</p>
          </div>

          <Button type="submit" className="w-full rounded-xl font-semibold">
            Confirmer la reservation
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
