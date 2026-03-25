import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GuideOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [accepted, setAccepted] = useState(false);

  const [zone, setZone] = useState('');
  const [village, setVillage] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [experience, setExperience] = useState('');

  const [bio, setBio] = useState('');
  const [story, setStory] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/guide/dashboard');
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-24 pt-14">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <h1 className="text-title">Informations personnelles</h1>
            <p className="text-caption">Etape {step} sur 3</p>
          </div>
          <div className="w-9" />
        </div>

        <div className="mb-6 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-4">
                <h2 className="text-sm font-semibold mb-3">Etape 1 - Identite</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-foreground">Prenom</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Votre prenom"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Nom</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-foreground">Telephone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="06xxxxxxxx"
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-foreground">Date de naissance</label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Genre</label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="" disabled>Selectionner</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 rounded border border-input"
                  />
                  <span>
                    J'accepte les conditions generales d'utilisation et la charte du guide local *
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h2 className="text-sm font-semibold mb-3">Etape 2 - Competences et expertise</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-foreground">Zone d'activite</label>
                  <input
                    type="text"
                    required
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Souss-Massa"
                    list="zone-options"
                  />
                  <datalist id="zone-options">
                    <option value="Souss-Massa" />
                    <option value="Agadir" />
                    <option value="Taroudant" />
                    <option value="Tiznit" />
                    <option value="Chtouka Ait Baha" />
                  </datalist>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Village</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Votre village"
                    list="village-options"
                  />
                  <datalist id="village-options">
                    <option value="Tafraoute" />
                    <option value="Ait Baha" />
                    <option value="Imouzzer" />
                    <option value="Taliouine" />
                    <option value="Tiout" />
                  </datalist>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-foreground">Specialites</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Randonnee', 'Gastronomie', 'Artisanat', 'Culture amazighe', 'Nature', 'Photographie'].map((s) => {
                    const active = specialties.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSpecialties((prev) => (active ? prev.filter((x) => x !== s) : [...prev, s]))}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground'}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" required value={specialties.join(',')} />
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-foreground">Langues parlees</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Français', 'Arabe', 'Amazigh', 'Anglais', 'Espagnol'].map((l) => {
                    const active = languages.includes(l);
                    return (
                      <button
                        type="button"
                        key={l}
                        onClick={() => setLanguages((prev) => (active ? prev.filter((x) => x !== l) : [...prev, l]))}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground'}`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" required value={languages.join(',')} />
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-foreground">Experience</label>
                <select
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>Selectionner</option>
                  <option value="0-1">0-1 an</option>
                  <option value="2-3">2-3 ans</option>
                  <option value="4-6">4-6 ans</option>
                  <option value="7+">7 ans et plus</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h2 className="text-sm font-semibold mb-3">Etape 3 - Profil et documents</h2>
              <div>
                <label className="text-xs font-medium text-foreground">Biographie</label>
                <textarea
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="Quelques lignes sur vous..."
                />
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-foreground">Votre histoire</label>
                <textarea
                  required
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="Pourquoi devenir guide ?"
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-foreground">Photo de profil</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Piece d'identite</label>
                  <input
                    type="file"
                    onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-foreground">Certifications</label>
                <input
                  type="file"
                  onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" className="rounded-xl" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Retour
            </Button>
            {step < 3 ? (
              <Button type="button" className="flex-1 rounded-xl font-semibold" onClick={nextStep}>
                Suivant <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1 rounded-xl font-semibold">
                Soumettre ma candidature
              </Button>
            )}
          </div>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          {avatarFile || idFile || certFile ? 'Fichiers selectionnes' : 'Aucun fichier selectionne'}
        </div>
      </motion.div>
    </div>
  );
}
