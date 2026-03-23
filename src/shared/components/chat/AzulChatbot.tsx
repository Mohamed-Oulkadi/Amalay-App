import { FormEvent, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Sparkles, Send, X } from 'lucide-react';
import { mockPlaces, mockPosts } from '@/shared/lib/mockData';
import { cn } from '@/lib/utils';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  time: string;
};

function nowLabel() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

const initialMessage: ChatMessage = {
  id: 'm0',
  role: 'assistant',
  time: nowLabel(),
  text:
    "ⵣⴰⵣ ! Je suis Azul, votre concierge IA AMALAY. Je peux vous aider a :\n\n🗓️ Creer votre programme sur mesure\n🌟 Analyser les avis des voyageurs\n🎯 Recommander les meilleures experiences\n💡 Donner des insights personnalises\n\nComment puis-je vous aider aujourd'hui ?",
};

function buildProgramReply() {
  const top = [...mockPlaces].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return `Voici un programme rapide sur 2 jours:\n\nJour 1: ${top[0]?.name} (${top[0]?.region}) puis ${top[1]?.name}.\nJour 2: ${top[2]?.name} avec un depart tot.\n\nBudget estime: ${top.reduce((sum, p) => sum + p.price, 0)} MAD / personne.`;
}

function buildReviewsReply() {
  const totalLikes = mockPosts.reduce((sum, p) => sum + p.likesCount, 0);
  const bestPost = [...mockPosts].sort((a, b) => b.likesCount - a.likesCount)[0];
  return `Analyse des avis voyageurs:\n\n- ${mockPosts.length} publications analysees\n- ${totalLikes} likes au total\n- Spot le plus apprecie: ${bestPost.placeName}\n\nTendance: les voyageurs valorisent surtout l'authenticite locale et les experiences nature.`;
}

function buildRecommendationReply() {
  const picks = [...mockPlaces].sort((a, b) => b.matchScore - a.matchScore).slice(0, 2);
  return `Mes recommandations du moment:\n\n1) ${picks[0].name} - ${picks[0].matchScore}% match\n2) ${picks[1].name} - ${picks[1].matchScore}% match\n\nSouhaitez-vous une version "aventure", "culture" ou "famille" ?`;
}

function buildInsightReply() {
  const avgPrice = Math.round(mockPlaces.reduce((sum, p) => sum + p.price, 0) / mockPlaces.length);
  const avgRating = (mockPlaces.reduce((sum, p) => sum + p.rating, 0) / mockPlaces.length).toFixed(1);
  return `Insights personnalises:\n\n- Budget moyen observe: ${avgPrice} MAD\n- Note moyenne des experiences: ${avgRating}/5\n- Duree type la plus confortable: demi-journee a journee complete\n\nJe peux vous proposer un plan optimise selon votre budget.`;
}

function answerFor(input: string) {
  const q = input.toLowerCase();
  if (q.includes('programme') || q.includes('plan')) return buildProgramReply();
  if (q.includes('avis') || q.includes('commentaire')) return buildReviewsReply();
  if (q.includes('recommand') || q.includes('experience')) return buildRecommendationReply();
  if (q.includes('insight') || q.includes('budget') || q.includes('analyse')) return buildInsightReply();

  return "Je peux vous aider sur 4 axes: programme, avis voyageurs, recommandations et insights personnalises. Dites-moi ce que vous voulez en priorite.";
}

export function AzulChatbot() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const hiddenPaths = ['/login', '/register', '/guide/register', '/onboarding'];
  const hidden = useMemo(() => hiddenPaths.some((path) => location.pathname.startsWith(path)), [location.pathname]);

  if (hidden) return null;

  function pushMessage(role: 'assistant' | 'user', text: string) {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text, time: nowLabel() }]);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushMessage('user', trimmed);
    pushMessage('assistant', answerFor(trimmed));
    setInput('');
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-20 right-4 z-[70]">
      {open ? (
        <div className="w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2.5 text-foreground">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Azul - Concierge IA</p>
                <p className="mt-1 text-xs text-muted-foreground leading-none">AMALAY</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
                <Sparkles className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[min(360px,calc(100vh-220px))] space-y-3 overflow-y-auto bg-background p-3">
            {messages.map((message) => (
              <div key={message.id} className={cn('max-w-[88%]', message.role === 'user' ? 'ml-auto' : '')}>
                <div className={cn('rounded-2xl px-3 py-2.5 text-[16px] leading-relaxed', message.role === 'assistant' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground')}>
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
                <p className={cn('mt-1 text-[11px] text-muted-foreground', message.role === 'user' ? 'text-right' : '')}>{message.time}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-border bg-card p-3">
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre question..."
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => send('Créer votre programme sur mesure')} className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                🗓️ Programme
              </button>
              <button type="button" onClick={() => send('Analyser les avis des voyageurs')} className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                🌟 Analyser avis
              </button>
              <button type="button" onClick={() => send('Recommander les meilleures expériences')} className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                🎯 Recommandations
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg"
        >
          <Bot className="h-4 w-4" /> Azul
        </button>
      )}
    </div>
  );
}
