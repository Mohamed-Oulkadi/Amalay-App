import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, LogOut, Mail, Shield, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { useAuthStore, UserRole } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';

const roleLabel: Record<UserRole, string> = {
  tourist: 'Touriste',
  guide: 'Guide local',
};

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const profile = useProfileStore((s) => s.profile);
  const resetProfile = useProfileStore((s) => s.reset);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const progress = useMemo(() => {
    const fields = [profile.travelStyle, profile.fitnessLevel, profile.budgetRange, profile.tripDuration];
    const filled = fields.filter(Boolean).length + (profile.vibes.length > 0 ? 1 : 0) + (profile.languages.length > 0 ? 1 : 0);
    return Math.round((filled / 6) * 100);
  }, [profile]);

  const guideInfo = useMemo(() => ({
    status: 'En attente de validation',
    zone: 'Souss-Massa',
    village: 'Tafraoute',
    specialties: ['Randonnee', 'Gastronomie', 'Culture amazighe'],
    languages: ['Francais', 'Arabe', 'Amazigh'],
    experience: '4-6 ans',
    bio: 'Guide local passionne par le patrimoine et la nature.',
  }), []);

  function handleSave() {
    if (!name.trim() || !email.trim()) {
      toast.error('Nom et email sont requis');
      return;
    }

    const role = user?.role ?? 'tourist';
    login({
      id: user?.id ?? 't1',
      name: name.trim(),
      email: email.trim(),
      role,
      avatar: user?.avatar,
    });

    toast.success('Profil mis a jour');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  if (!user) {
    return (
      <PageWrapper className="px-4 pt-14">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center">
          <h1 className="text-lg font-bold">Profil</h1>
          <p className="mt-2 text-sm text-muted-foreground">Vous devez vous connecter pour acceder a votre profil.</p>
          <Button asChild className="mt-4 rounded-xl">
            <Link to="/login">Se connecter</Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="px-4 pt-14">
      <div className="mx-auto max-w-lg space-y-4 pb-24">
        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Mon profil</h1>
              <p className="text-xs text-muted-foreground">{roleLabel[user.role]}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Nom</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-4">
            <Button type="button" onClick={handleSave} className="rounded-xl">
              Enregistrer
            </Button>
          </div>
        </section>

        {user.role === 'guide' ? (
          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Profil guide</h2>
              <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                {guideInfo.status}
              </span>
            </div>
            <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">Zone d'activite</p>
                <p>{guideInfo.zone}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Village</p>
                <p>{guideInfo.village}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Specialites</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {guideInfo.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-medium text-primary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Langues</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {guideInfo.languages.map((l) => (
                    <span key={l} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Experience</p>
                <p>{guideInfo.experience}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-foreground">Biographie</p>
                <p>{guideInfo.bio}</p>
              </div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/guide/onboarding">Modifier</Link>
              </Button>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Profil voyageur</h2>
            </div>
            <p className="text-xs text-muted-foreground">Progression onboarding: {profile.completed ? 'Complete' : `${progress}%`}</p>

            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${profile.completed ? 100 : progress}%` }} />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.vibes.length > 0 ? (
                profile.vibes.map((vibe) => (
                  <span key={vibe} className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
                    {vibe}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">Aucune preference enregistree</span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/onboarding">Modifier</Link>
              </Button>
              <Button type="button" variant="ghost" className="rounded-xl" onClick={() => { resetProfile(); toast.success('Profil onboarding reinitialise'); }}>
                Reinitialiser
              </Button>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-primary" /> Actions
          </h2>
          {user.role === 'guide' ? (
            <div className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link to="/guide/places">Ajouter un spot</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link to="/guide/bookings">Voir mes reservations</Link>
              </Button>
              <Button type="button" variant="destructive" onClick={handleLogout} className="justify-start rounded-xl">
                <LogOut className="h-4 w-4" /> Se deconnecter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link to="/bookings">Mes reservations</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link to="/community">Communaute</Link>
              </Button>
              <Button type="button" variant="destructive" onClick={handleLogout} className="justify-start rounded-xl">
                <LogOut className="h-4 w-4" /> Se deconnecter
              </Button>
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
}
