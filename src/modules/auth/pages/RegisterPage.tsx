import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { BrandMark } from '@/shared/components/ui/BrandMark';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: 't1', name, email, role: 'tourist' });
    navigate('/onboarding');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <BrandMark className="mx-auto mb-3 h-12 w-12 rounded-xl" />
          <h1 className="text-display">Inscription</h1>
          <p className="text-body mt-1">Créez votre compte voyageur AMALAY</p>
        </div>

        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary-light p-3">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Compass className="h-4 w-4" /> Explorer les spots et réserver des activités
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Nom complet</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Min. 8 caractères"
            />
          </div>

          <Button type="submit" className="w-full rounded-xl py-3 font-semibold">
            S'inscrire <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-4 rounded-xl border border-border bg-card p-3">
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" /> Vous êtes guide local ? utilisez l'inscription guide dédiée.
          </p>
          <Link to="/guide/register" className="mt-1 inline-block text-sm font-semibold text-primary">
            Aller vers inscription guide
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-semibold text-primary">Se connecter</Link>
        </p>
      </motion.div>
    </div>
  );
}
