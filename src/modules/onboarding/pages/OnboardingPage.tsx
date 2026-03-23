import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfileStore } from '@/store/profileStore';
import { cn } from '@/lib/utils';

interface Step {
  question: string;
  field: string;
  options: { value: string; label: string; emoji: string }[];
  multi?: boolean;
}

const steps: Step[] = [
  {
    question: "Quel est votre style de voyage ?",
    field: 'travelStyle',
    options: [
      { value: 'solo', label: 'Solo', emoji: '🧑' },
      { value: 'couple', label: 'En couple', emoji: '❤️' },
      { value: 'family', label: 'En famille', emoji: '👨‍👩‍👧‍👦' },
      { value: 'group', label: 'En groupe', emoji: '👥' },
    ],
  },
  {
    question: "Qu'est-ce qui vous attire le plus ?",
    field: 'vibes',
    multi: true,
    options: [
      { value: 'nature', label: 'Nature', emoji: '🌿' },
      { value: 'culture', label: 'Culture', emoji: '🏛️' },
      { value: 'gastronomy', label: 'Gastronomie', emoji: '🍽️' },
      { value: 'adventure', label: 'Aventure', emoji: '⛰️' },
    ],
  },
  {
    question: "Quel est votre niveau de forme physique ?",
    field: 'fitnessLevel',
    options: [
      { value: 'easy', label: 'Tranquille', emoji: '🚶' },
      { value: 'medium', label: 'Modéré', emoji: '🥾' },
      { value: 'sport', label: 'Sportif', emoji: '🏃' },
    ],
  },
  {
    question: "Quel budget par activité ?",
    field: 'budgetRange',
    options: [
      { value: 'low', label: '< 100 MAD', emoji: '💰' },
      { value: 'mid', label: '100–300 MAD', emoji: '💰💰' },
      { value: 'high', label: '300+ MAD', emoji: '💰💰💰' },
    ],
  },
  {
    question: "Quelles langues parlez-vous ?",
    field: 'languages',
    multi: true,
    options: [
      { value: 'fr', label: 'Français', emoji: '🇫🇷' },
      { value: 'ar', label: 'العربية', emoji: '🇲🇦' },
      { value: 'en', label: 'English', emoji: '🇬🇧' },
      { value: 'amazigh', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', emoji: 'ⵣ' },
    ],
  },
  {
    question: "Quelle durée pour votre séjour ?",
    field: 'tripDuration',
    options: [
      { value: '1day', label: '1 journée', emoji: '☀️' },
      { value: 'weekend', label: 'Week-end', emoji: '🗓️' },
      { value: '1week', label: '1 semaine', emoji: '📅' },
      { value: 'more', label: '+1 semaine', emoji: '🌍' },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setField, complete } = useProfileStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: "Bienvenue sur AMALAY ! 🌍 Je vais vous poser quelques questions pour personnaliser vos recommandations." },
  ]);
  const [done, setDone] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const handleSelect = (value: string) => {
    if (done) return;

    const isMulti = step.multi;
    let newVal: any;
    if (isMulti) {
      const current = (answers[step.field] as string[]) || [];
      newVal = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setAnswers({ ...answers, [step.field]: newVal });
    } else {
      newVal = value;
      setAnswers({ ...answers, [step.field]: newVal });
      advance(value);
    }
  };

  const advance = (selectedValue?: any) => {
    const val = selectedValue ?? answers[step.field];
    const label = Array.isArray(val)
      ? step.options.filter((o) => val.includes(o.value)).map((o) => o.label).join(', ')
      : step.options.find((o) => o.value === val)?.label || val;

    setField(step.field as any, val);

    const newMessages = [
      ...messages,
      { from: 'user' as const, text: label },
    ];

    if (currentStep < totalSteps - 1) {
      const nextStep = steps[currentStep + 1];
      newMessages.push({ from: 'bot' as const, text: nextStep.question });
      setMessages(newMessages);
      setCurrentStep(currentStep + 1);
    } else {
      newMessages.push({ from: 'bot' as const, text: "Votre profil est prêt ! 🎉 Je vais maintenant trouver les meilleures recommandations pour vous." });
      setMessages(newMessages);
      setDone(true);
      complete();
      setTimeout(() => navigate('/recommendations'), 1500);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-6 pb-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i <= currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted'
            )}
          />
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}
            >
              {msg.from === 'bot' && (
                <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                  msg.from === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-card border border-border text-foreground rounded-bl-sm'
                )}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Options */}
      {!done && step && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-card px-4 py-4 safe-area-pb"
        >
          {currentStep === 0 && messages.length === 1 && (
            <p className="text-body mb-3 text-center">{step.question}</p>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            {step.options.map((opt) => {
              const isSelected = step.multi
                ? ((answers[step.field] as string[]) || []).includes(opt.value)
                : answers[step.field] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    'rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/40'
                  )}
                >
                  <span className="mr-1.5">{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          {step.multi && (
            <Button
              onClick={() => advance()}
              disabled={!answers[step.field] || (answers[step.field] as string[]).length === 0}
              className="mt-3 w-full rounded-xl font-semibold"
            >
              Continuer <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
