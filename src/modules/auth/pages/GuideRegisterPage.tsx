import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { BrandMark } from '@/shared/components/ui/BrandMark';

export default function GuideRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: 'g1', name, email, role: 'guide' });
    navigate('/guide/onboarding');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <BrandMark className="mx-auto mb-3 h-12 w-12 rounded-xl" />
          <h1 className="text-display">Inscription Guide</h1>
          <p className="text-body mt-1">Rejoignez AMALAY en tant que guide local</p>
        </div>

        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary-light p-3 text-sm text-primary">
          <p className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="h-4 w-4" /> Compte guide professionnel
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
              placeholder="guide@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Region principale</label>
            <input
              type="text"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Souss-Massa"
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
              placeholder="Min. 8 caracteres"
            />
          </div>
          <Button type="submit" className="w-full rounded-xl py-3 font-semibold">
            Devenir guide <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Vous etes touriste ?{' '}
          <Link to="/register" className="font-semibold text-primary">Inscription standard</Link>
        </p>
      </motion.div>
    </div>
  );
}
