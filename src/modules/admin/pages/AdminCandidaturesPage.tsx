import { Check, X, User } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';

const candidatures = [
  { id: 'c1', name: 'Ahmed Bensalem', zone: 'Taroudant', experience: '6 ans', status: 'pending' },
  { id: 'c2', name: 'Fatima Ouhamou', zone: 'Tiznit', experience: '4 ans', status: 'pending' },
  { id: 'c3', name: 'Youssef Ait Ali', zone: 'Agadir', experience: '2 ans', status: 'pending' },
];

export default function AdminCandidaturesPage() {
  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Candidatures</h1>
          <p className="text-body">Valider ou refuser les guides</p>
        </div>

        <div className="space-y-3 pb-24">
          {candidatures.map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{c.name}</h4>
                <p className="text-caption">{c.zone} · {c.experience}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-guide-light text-guide">
                  <Check className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
