import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, Languages, MapPin, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { StarRating } from '@/shared/components/ui/StarRating';
import { Button } from '@/components/ui/button';
import { mockGuides, languageLabels } from '@/shared/lib/mockData';
import { cn } from '@/lib/utils';

const timeSlots = ['08:00', '10:00', '14:00', '16:00'];

function toInputDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

type ChatMessage = {
  id: string;
  role: 'user' | 'guide';
  text: string;
};

export default function GuideDetailPage() {
  const { id } = useParams();
  const guide = mockGuides.find((g) => g.id === id);
  const [date, setDate] = useState(toInputDate(1));
  const [timeSlot, setTimeSlot] = useState(timeSlots[0]);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'guide',
      text: 'Bonjour, je suis disponible pour repondre a vos questions sur la visite.',
    },
  ]);

  function handleReserve(e: FormEvent) {
    e.preventDefault();
    toast.success(`Demande envoyee pour le ${date} a ${timeSlot}`);
  }

  function handleChatSubmit(e: FormEvent) {
    e.preventDefault();
    const message = chatMessage.trim();
    if (!message) {
      toast.error('Ecrivez un message avant envoi');
      return;
    }
    const userMessage: ChatMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      text: message,
    };
    const guideReply: ChatMessage = {
      id: `${Date.now()}-g`,
      role: 'guide',
      text: `Merci pour votre message. Je vous confirme la disponibilite pour le ${date} a ${timeSlot}.`,
    };
    setMessages((prev) => [...prev, userMessage, guideReply]);
    setChatMessage('');
  }

  if (!guide) {
    return (
      <PageWrapper className="px-4 pt-14">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center">
          <h1 className="text-lg font-bold">Guide introuvable</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ce guide n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Button asChild className="mt-4 rounded-xl">
            <Link to="/explore">Retour a l&apos;exploration</Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="px-4 pt-14">
      <div className="mx-auto max-w-lg space-y-4 pb-24">
        <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <img src={guide.avatar} alt={guide.name} className="h-14 w-14 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-lg font-bold">{guide.name}</h1>
                {guide.certified ? <ShieldCheck className="h-4 w-4 text-guide" /> : null}
              </div>
              <p className="text-sm text-muted-foreground">{guide.specialty}</p>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={guide.rating} size="sm" />
                <span className="text-xs text-muted-foreground">{guide.visitCount} visites</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">A propos</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{guide.bio}</p>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Region: {guide.region}
            </p>
            <p className="inline-flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              Langues: {guide.languages.map((lang) => languageLabels[lang] ?? lang).join(', ')}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">Reservation rapide</h2>
          <form onSubmit={handleReserve} className="mt-3 space-y-3">
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

            <Button type="submit" className="w-full rounded-xl font-semibold">
              Reserver ce guide
            </Button>
          </form>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
            <MessageCircle className="h-4 w-4 text-primary" /> Espace chat
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Envoyez un message au guide pour poser vos questions avant la reservation.
          </p>

          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded-xl border border-border bg-background p-3">
            {messages.map((message) => (
              <div key={message.id} className={cn('max-w-[88%]', message.role === 'user' ? 'ml-auto' : '')}>
                <div
                  className={cn(
                    'rounded-2xl px-3 py-2 text-sm',
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ecrire un message..."
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </PageWrapper>
  );
}
