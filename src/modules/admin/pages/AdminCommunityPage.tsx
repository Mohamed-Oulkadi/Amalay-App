import { MessageCircle } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { AdminLayout } from '@/modules/admin/components/AdminLayout';
import { mockPosts } from '@/shared/lib/mockData';

export default function AdminCommunityPage() {
  return (
    <PageWrapper className="p-0" hasBottomNav={false}>
      <AdminLayout>
        <div className="pb-6">
          <h1 className="text-display">Communaute</h1>
          <p className="text-body">Moderation des publications</p>
        </div>

        <div className="space-y-3 pb-24">
          {mockPosts.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <img src={p.authorAvatar} alt={p.authorName} className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{p.authorName}</h4>
                  <p className="text-caption">{p.placeName} · {p.createdAt}</p>
                </div>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-sm text-foreground line-clamp-3">{p.content}</p>
            </div>
          ))}
        </div>
      </AdminLayout>
    </PageWrapper>
  );
}
